import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/post";

export const postConsumer = async () => {
    const messages: any = [];
    let processing = false;

    try {
        await kafkaConfig.subscribeToTopic('post');
        await kafkaConfig.consume(async (message) => {
            message = JSON.parse(message);
            messages.push(message);
            console.log('Received message from topic', message);

            if (messages.length > 100) {
                processMessages();
            }
            console.log('Consumed messages');
        });

        setInterval(processMessages, 5000);
    } catch (e) {
        console.error('Error subscribing to topic', e);
    }
    async function processMessages() {
        if (messages.length > 0 && !processing) {
            processing = true;
            const batchToProcess = [...messages];
            messages.length = 0;
            try {
                await PostModel.insertMany(batchToProcess, { ordered: false });
                console.log('bulk insert successful');
            } catch (e) {
                console.error('Error processing batch', e);
                messages.push(...batchToProcess);
            } finally {
                processing = false;
            }
        }
    }   
}

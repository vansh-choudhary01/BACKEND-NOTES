import kafkaConfig from './config/kafka.config';

export const init = async () => {
    try {
        await kafkaConfig.connect();
        await kafkaConfig.createTopic('post');
        console.log('Kafka Connected');
    } catch (e) {
        console.error('Error connecting to Kafka', e); 
    }
}
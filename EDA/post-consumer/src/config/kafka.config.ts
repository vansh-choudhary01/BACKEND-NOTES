
import { Admin, Kafka, logLevel, Consumer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private consumer: Consumer;
    private admin: Admin;
    private broker: string;

    constructor() {
        this.broker = process.env.KAFKA_BROKER || "localhost:9092";
        this.kafka = new Kafka({
            clientId: "post-consumer",
            brokers: [this.broker],
            logLevel: logLevel.ERROR,
        });
        this.consumer = this.kafka.consumer({ groupId: "post-consumer" });
        this.admin = this.kafka.admin();
    }

    async connect(): Promise<void> {
        try {
            await this.consumer.connect();
            await this.admin.connect();
            console.log("Connected to Kafka");
        } catch (e) {
            console.error("Error connecting to Kafka", e);
        }
    }

    async subscribeToTopic(topic: string): Promise<void> {
        try {
            await this.consumer.subscribe({ topic, fromBeginning: true });
            console.log("Subscribed to topic", topic);
        } catch (e) {
            console.error("Error subscribing to topic", e);
        }
    }

    async consume(callback : (message : any) => void): Promise<void> {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log("Received message from topic", topic);
                    callback(message?.value?.toString());
                }
            });
            console.log("Consumed messages");
        } catch (e) {
            console.error("Error consuming messages", e);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.consumer.disconnect();
            console.log("Disconnected from Kafka");
        } catch (e) {
            console.error("Error disconnecting from Kafka", e);
        }
    }
}

export default new KafkaConfig();
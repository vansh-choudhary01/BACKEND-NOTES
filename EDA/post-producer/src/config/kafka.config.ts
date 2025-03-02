import { Admin, Kafka, logLevel, Producer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;
    private broker: string;

    constructor() {
        this.broker = process.env.KAFKA_BROKER || "localhost:9092";
        this.kafka = new Kafka({
            clientId: "post-producer",
            brokers: [this.broker],
            logLevel: logLevel.ERROR,
        });
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }

    async connect(): Promise<void> {
        try {
            await this.producer.connect();
            await this.admin.connect();
            console.log("Connected to Kafka");
        } catch (e) {
            console.error("Error connecting to Kafka", e);
        }
    }

    async createTopic(topic: string): Promise<void> {
        try {
            await this.admin.createTopics({
                topics: [{
                    topic: topic,
                    numPartitions: 1,
                }],
            });
            console.log("Created topic", topic);
        } catch (e) {
            console.error("Error creating topic", e);
        }
    }

    async sendToTopic(topic: string, message: string): Promise<void> {
        try {
            await this.producer.send({
                topic: topic,
                messages: [{
                    value: message,
                }],
            });
            console.log("Sent message to topic", topic);
        } catch (e) {
            console.error("Error sending message to topic", e);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.producer.disconnect();
            await this.admin.disconnect();
            console.log("Disconnected from Kafka");
        } catch (e) {
            console.error("Error disconnecting from Kafka", e);
        }
    }
}

export default new KafkaConfig();
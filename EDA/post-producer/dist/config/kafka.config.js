"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
class KafkaConfig {
    constructor() {
        this.broker = process.env.KAFKA_BROKER || "localhost:9092";
        this.kafka = new kafkajs_1.Kafka({
            clientId: "post-producer",
            brokers: [this.broker],
            logLevel: kafkajs_1.logLevel.ERROR,
        });
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.producer.connect();
                yield this.admin.connect();
                console.log("Connected to Kafka");
            }
            catch (e) {
                console.error("Error connecting to Kafka", e);
            }
        });
    }
    createTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.admin.createTopics({
                    topics: [{
                            topic: topic,
                            numPartitions: 1,
                        }],
                });
                console.log("Created topic", topic);
            }
            catch (e) {
                console.error("Error creating topic", e);
            }
        });
    }
    sendToTopic(topic, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.producer.send({
                    topic: topic,
                    messages: [{
                            value: message,
                        }],
                });
                console.log("Sent message to topic", topic);
            }
            catch (e) {
                console.error("Error sending message to topic", e);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.producer.disconnect();
                yield this.admin.disconnect();
                console.log("Disconnected from Kafka");
            }
            catch (e) {
                console.error("Error disconnecting from Kafka", e);
            }
        });
    }
}
exports.default = new KafkaConfig();

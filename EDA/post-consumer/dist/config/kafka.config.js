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
            clientId: "post-consumer",
            brokers: [this.broker],
            logLevel: kafkajs_1.logLevel.ERROR,
        });
        this.consumer = this.kafka.consumer({ groupId: "post-consumer" });
        this.admin = this.kafka.admin();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.connect();
                yield this.admin.connect();
                console.log("Connected to Kafka");
            }
            catch (e) {
                console.error("Error connecting to Kafka", e);
            }
        });
    }
    subscribeToTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.subscribe({ topic, fromBeginning: true });
                console.log("Subscribed to topic", topic);
            }
            catch (e) {
                console.error("Error subscribing to topic", e);
            }
        });
    }
    consume(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.run({
                    eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                        var _b;
                        console.log("Received message from topic", topic);
                        callback((_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString());
                    })
                });
                console.log("Consumed messages");
            }
            catch (e) {
                console.error("Error consuming messages", e);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.disconnect();
                console.log("Disconnected from Kafka");
            }
            catch (e) {
                console.error("Error disconnecting from Kafka", e);
            }
        });
    }
}
exports.default = new KafkaConfig();

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConsumer = void 0;
const kafka_config_1 = __importDefault(require("../config/kafka.config"));
const post_1 = __importDefault(require("../model/post"));
const postConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    const messages = [];
    let processing = false;
    try {
        yield kafka_config_1.default.subscribeToTopic('post');
        yield kafka_config_1.default.consume((message) => __awaiter(void 0, void 0, void 0, function* () {
            message = JSON.parse(message);
            messages.push(message);
            console.log('Received message from topic', message);
            if (messages.length > 100) {
                processMessages();
            }
            console.log('Consumed messages');
        }));
        setInterval(processMessages, 5000);
    }
    catch (e) {
        console.error('Error subscribing to topic', e);
    }
    function processMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            if (messages.length > 0 && !processing) {
                processing = true;
                const batchToProcess = [...messages];
                messages.length = 0;
                try {
                    yield post_1.default.insertMany(batchToProcess, { ordered: false });
                    console.log('bulk insert successful');
                }
                catch (e) {
                    console.error('Error processing batch', e);
                    messages.push(...batchToProcess);
                }
                finally {
                    processing = false;
                }
            }
        });
    }
});
exports.postConsumer = postConsumer;

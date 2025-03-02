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
exports.init = void 0;
const db_config_1 = require("./config/db.config");
const kafka_config_1 = __importDefault(require("./config/kafka.config"));
const post_consumer_1 = require("./services/post.consumer");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_config_1.connectDB)();
        yield kafka_config_1.default.connect();
        yield (0, post_consumer_1.postConsumer)();
        console.log('Kafka Connected');
    }
    catch (e) {
        console.error('Error connecting to Kafka', e);
    }
});
exports.init = init;

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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const kafka_config_1 = __importDefault(require("../config/kafka.config"));
const router = express_1.default.Router();
const postSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
});
const validatePost = (req, res, next) => {
    try {
        postSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
router.post('/create-post', validatePost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    try {
        yield kafka_config_1.default.sendToTopic('post', JSON.stringify({ title, content }));
        res.status(200).json({ message: 'Post created successfully' });
    }
    catch (e) {
        console.error('Error sending to Kafka', e);
        res.status(500).json({ error: 'Error sending to Kafka' });
    }
}));
exports.default = router;

import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import kafkaConfig from '../config/kafka.config';

const router = express.Router();

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

const validatePost = (req : Request, res : Response, next : NextFunction) => {
  try {
    postSchema.parse(req.body);
    next(); 
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

router.post('/create-post', validatePost, async (req : Request, res : Response) => {
    const { title, content } = req.body;
    try {
        await kafkaConfig.sendToTopic('post', JSON.stringify({title, content}));
        res.status(200).json({ message: 'Post created successfully' });
    } catch (e) {
        console.error('Error sending to Kafka', e);
        res.status(500).json({ error: 'Error sending to Kafka' });
    }
});

export default router;
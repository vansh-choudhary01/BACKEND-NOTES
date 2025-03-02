import express, { Request, Response, NextFunction } from 'express';
import { init } from './start.services';
const app = express();

app.use(express.json());

init();
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
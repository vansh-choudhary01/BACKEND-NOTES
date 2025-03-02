import express from 'express';
import cors from 'cors';
import { init } from './start.services';
import postRoutes from './services/create-post';
const app = express();

app.use(cors());
app.use(express.json());
init();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', postRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
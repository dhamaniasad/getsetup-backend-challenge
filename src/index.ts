import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PORT } from '../config';
import connectDB from "../config/database";
import availability from './routes/availability';
import user from './routes/user';

const app: Express = express();

connectDB();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/availability', availability);
app.use('/api/user', user);

app.listen(PORT, () => {
  console.log(`The application is running on port ${PORT}`);
});

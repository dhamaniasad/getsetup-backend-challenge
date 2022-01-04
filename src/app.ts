import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

import availability from './routes/availability';
import user from './routes/user';

const app: Express = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/availability', availability);
app.use('/api/user', user);

export default app;

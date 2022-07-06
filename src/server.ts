import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from get!');
});

app.listen(PORT, () => {
  console.log(`starting app from: ${PORT}`);
});

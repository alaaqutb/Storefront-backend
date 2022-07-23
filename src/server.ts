import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/User';
import productRoutes from './handlers/Product';
import orderRoutes from './handlers/Order';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from get!');
});
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(PORT, () => {
  console.log(`starting app from: ${PORT}`);
});

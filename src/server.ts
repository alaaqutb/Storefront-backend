import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/User';
import productRoutes from './handlers/Product';
import orderRoutes from './handlers/Order';

export const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello from get!');
});
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`starting app from: ${PORT}`);
});

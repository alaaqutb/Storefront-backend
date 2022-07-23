import { Pruchase } from './../models/Pruchase';
import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/Order';
import verifyAuthToken from './User'

const orderRoutes = express.Router();

const index = async (_req: Request, res: Response) => {
  const orders = await OrderModel.index();
  res.json({orders});
};

const show = async (req: Request, res: Response) => {
  const order = await OrderModel.show(req.params.id);
  res.json({order});
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const p: Order = {
      status: req.body.status,
    };
    const op: Pruchase = {
      products: req.body.products,
      user_id: req.body.user_id,
    };
    const nawOrder = await new OrderModel().create(p, op);
    res.json({ p: nawOrder });
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const getCurrentOrders = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const orders = await new OrderModel().getCurrentOrders(id);
    res.json({ orders });
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

orderRoutes.get('/orders', verifyAuthToken, index);
orderRoutes.get('/orders/:id', show);
orderRoutes.get('/currentorder/user/:id', verifyAuthToken, getCurrentOrders);
orderRoutes.post('/orders', verifyAuthToken, create);

export default orderRoutes;

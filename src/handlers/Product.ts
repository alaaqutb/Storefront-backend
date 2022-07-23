import express, { Request, Response } from 'express';
import { Product, ProductModel } from '../models/Product';
import verifyAuthToken from './User';

const productRoutes = express.Router();

const index = async (_req: Request, res: Response) => {
  const products = await ProductModel.index();
  res.json({products});
};

const show = async (req: Request, res: Response) => {
  const user = await ProductModel.show(req.params.id);
  res.json({user});
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const p: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const nawProduct = await ProductModel.create(p);
    res.json({ p: nawProduct });
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

productRoutes.get('/products', verifyAuthToken, index);
productRoutes.get('/products/:id', verifyAuthToken, show);
productRoutes.post('/products', verifyAuthToken, create);

export default productRoutes;

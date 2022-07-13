import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/User';

//const store= new my_user();

const index = async (_req: Request, res: Response) => {
  const users = await UserModel.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await UserModel.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
      const u: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
      
      }
      const nawUser = await UserModel.create(u)
      res.json({u:nawUser})
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};

export default userRoutes;

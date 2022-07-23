import express, { Request, Response, NextFunction } from 'express';
import { User, UserModel } from '../models/User';
import jwt, { Secret } from 'jsonwebtoken';

const userRoutes = express.Router();

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization as unknown as string;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    res.locals.userDecode = decoded;
    next();
  } catch (error) {
    res.status(401).json({ response: 'Access denied, invalid token' });
  }
};

const index = async (_req: Request, res: Response) => {
  const users = await UserModel.index();
  res.json({users});
};

const show = async (req: Request, res: Response) => {
  const user = await UserModel.show(req.params.id);
  res.json({user});
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const u: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    };
    const nawUser = await UserModel.create(u);
    res.json({ u: nawUser });
  } catch (err) {
    res.status(400);
    res.json({err});
  }
};

const authenticate = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const authenticated = await new UserModel().authenticate(
        username,
        password
      );
      if (authenticated) {
        const token = jwt.sign(
          { user: authenticated },
          process.env.TOKEN_SECRET as Secret
        );
        res.json({ token });
      } else {
        res.status(401).json({ response: 'invalid username or password' });
      }
    } else {
      res.status(400).json({ response: 'username and password are required' });
    }
  } catch (err) {
    res.status(404).json({ response: 'Not Found' });
  }
};

userRoutes.get('/users', verifyAuthToken, index);
userRoutes.get('/users/:id', verifyAuthToken, show);
userRoutes.post('/users', create);
userRoutes.post('/users/login', authenticate);

export default userRoutes;

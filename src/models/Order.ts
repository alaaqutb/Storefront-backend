import client from '../database';
import { Pruchase, PruchaseModel } from './Pruchase';

export enum Status {
  'active'= 'active',
  'complete'= 'complete',
}

export type Order = {
  id?: number;
  status: Status;
};

export class OrderModel {
  static async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }

  static async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  create = async (p: Order, op: Pruchase): Promise<Order[]> => {
    try {
      const sql = 'INSERT INTO orders (status) VALUES($1) RETURNING id, status';
      const conn = await client.connect();

      const result = await conn.query(sql, [p.status]);

      const product = result.rows[0];

      conn.release();
      await new PruchaseModel().create(op, result.rows[0].id);
      return product;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  };

  getCurrentOrders = async (user_id: number): Promise<Order[]> => {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT orders.id, status, user_id FROM orders INNER JOIN pruchases ON orders.id=pruchases.order_id WHERE user_id=($1) AND status='active'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get current orders: ${err}`);
    }
  };
}

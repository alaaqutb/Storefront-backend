import client from '../database';

export type Pruchase = {
  id?: number;
  products: [{ id: number; quantity: number }];
  user_id: number;
};

export class PruchaseModel {
  create = async (Pruchase: Pruchase, order_id: number): Promise<void> => {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO pruchases (order_id, product_id, user_id, quantity) VALUES ($1, $2, $3, $4)';

      Pruchase.products.forEach(async (product) => {
        await conn.query(sql, [
          order_id,
          product.id,
          Pruchase.user_id,
          product.quantity,
        ]);
      });
      conn.release();
    } catch (err) {
      throw new Error(`Cannot create order product: ${err}`);
    }
  };
}

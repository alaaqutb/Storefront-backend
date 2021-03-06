import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductModel {
  static async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT name, price FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }
  static async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT name,price FROM products WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  static async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING id, name, price';
      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new Product. Error: ${err}`);
    }
  }
}

import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
};

export class UserModel {
  static async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT first_name,last_name, username FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }

  static async show(id: string): Promise<User> {
    try {
      const sql =
        'SELECT first_name, last_name, username FROM users WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  static async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, username';
      const hashed = bcrypt.hashSync(
        u.password as string + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const conn = await client.connect();

      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hashed,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new User. Error: ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<object | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not add new User. Error: ${err}`);
    }
  }
}

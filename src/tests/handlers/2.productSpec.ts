import supertest, { Response, Test } from 'supertest';
import {app} from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
let token = '';

beforeAll(async (): Promise<void> => {
  const response: Response = await request.post('/users/login').send({
    username: 'admin',
    password: 'password',
  });
  token = response.body.token;
});

describe('Product API', () => {
  it('should return all products', async () => {
    const response: Response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('should create a product', async () => {
    const response: Response = await request
      .post('/products')
      .set('authorization', token)
      .send({
        name: 'My Product',
        price: 1500,
      });
    expect(response.status).toBe(200);
  });

  it('should return a specific product', async () => {
    const response: Response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });
});

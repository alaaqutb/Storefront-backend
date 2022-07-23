import supertest, { Response, Test } from 'supertest';
import {app} from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
const token = '';

describe('Product API', () => {
    it('should return all products', async () => {
      const response: Response = await request
        .get('/products')
        .set('authorization', token);
      expect(response.status).toBe(200);
    });
  
    it('should return 401 [token required]', async () => {
      const response: Response = await request.get('/products');
      expect(response.status).toBe(401);
    });
  
    it('should return a specific Product', async () => {
      const response: Response = await request
        .get('/products/1')
        .set('authorization', token);
      expect(response.status).toBe(200);
    });
  
    it('should return 401 [token required]', async () => {
      const response: Response = await request.get('/products/1');
      expect(response.status).toBe(401);
    });
  
    it('should create a Product', async () => {
      const response: Response = await request.post('/products').send({
       name:"test product",
       price:25
      });
      expect(response.status).toBe(200);
    });
})
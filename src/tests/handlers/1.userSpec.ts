import supertest, { Response, Test } from 'supertest';
import {app} from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
const token = '';

describe('User API', () => {
    it('should return all users', async () => {
      const response: Response = await request
        .get('/users')
        .set('authorization', token);
      expect(response.status).toBe(200);
    });
  
    it('should return 401 [token required]', async () => {
      const response: Response = await request.get('/users');
      expect(response.status).toBe(401);
    });
  
    it('should return a specific user', async () => {
      const response: Response = await request
        .get('/users/1')
        .set('authorization', token);
      expect(response.status).toBe(200);
    });
  
    it('should return 401 [token required]', async () => {
      const response: Response = await request.get('/users/1');
      expect(response.status).toBe(401);
    });
  
    it('should create a user', async () => {
      const response: Response = await request.post('/users').send({
        username: 'alaaatef',
        first_name: 'alaa',
        last_name: 'atef',
        password: '789',
      });
      expect(response.status).toBe(200);
    });
  
    it('should login a user', async () => {
      const response: Response = await request.post('/users/login').send({
        username: 'alaaatef',
        password: '789',
      });
      expect(response.status).toBe(200);
    });
})
import supertest, { Response, Test } from 'supertest';
import {app} from '../../server';

const request: supertest.SuperTest<Test> = supertest(app);
let token = '';

beforeAll(async (): Promise<void> => {
  await request.post('/users').send({
    username: 'admin',
    first_name: 'admin',
    last_name: 'admin',
    password: 'password',
  });

  const response: Response = await request.post('/users/login').send({
    username: 'admin',
    password: 'password',
  });
  token = response.body.token;
});

describe('User API', () => {
  it('should return all users', async () => {
    const response: Response = await request
      .get('/users')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('should return 401', async () => {
    const response: Response = await request.get('/users');
    expect(response.status).toBe(401);
  });

  it('should return a user', async () => {
    const response: Response = await request
      .get('/users/1')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  it('should return 401', async () => {
    const response: Response = await request.get('/users/1');
    expect(response.status).toBe(401);
  });
  
  it('should login a user', async () => {
    const response: Response = await request.post('/users/login').send({
      username: 'admin',
      password: 'password',
    });
    expect(response.status).toBe(200);
  });

  it('should create a user', async () => {
    const response: Response = await request.post('/users').send({
      username: 'admin',
      first_name: 'admin',
      last_name: 'admin',
      password: 'password',
    });
    expect(response.status).toBe(200);
  });

});

import { UserModel } from '../../models/User';

describe('User', () => {
  it('index should be defined', () => {
    expect(UserModel.index).toBeDefined();
  });

  it('show should be defined', () => {
    expect(UserModel.show).toBeDefined();
  });

  it('create should be defined', () => {
    expect(UserModel.create).toBeDefined();
  });

  it('authenticate should be defined', () => {
    expect(new UserModel().authenticate).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await UserModel.create({
      first_name: 'mytest',
      last_name: 'first',
      username: 'test',
      password: '123456',
    });
    expect(result).toEqual({
      id: result.id,
      first_name: 'mytest',
      last_name: 'first',
      username: 'test',
    });
  });

  it('Get All Users', async () => {
    const users = await UserModel.index();
    expect(users.length).toBeGreaterThan(0);
  });
});

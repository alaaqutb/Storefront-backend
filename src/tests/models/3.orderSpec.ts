import { Order, OrderModel, Status } from './../../models/Order';

describe('Order', () => {
  it('index should be defined', () => {
    expect(OrderModel.index).toBeDefined();
  });

  it('show should be defined', () => {
    expect(OrderModel.show).toBeDefined();
  });

  it('create should be defined', () => {
    expect(new OrderModel().create).toBeDefined();
  });

  it('show current orders should be defined', () => {
    expect(new OrderModel().getCurrentOrders).toBeDefined();
  });

  it('Get All Orders', async () => {
    await new OrderModel().create(
      { status: Status.active },
      { products: [{ id: 1, quantity: 5 }], user_id: 1 }
    );
    const orders = await OrderModel.index();
    expect(orders.length).toBeGreaterThan(0);
  });
});

import OrderHandler from './OrderHandler';
import { IOrder } from '../order/IOrder';

export default class CompleteOrderHandler extends OrderHandler {
  handle(order: IOrder): void {
    order.setStatus('in process');
    console.log(`
      Order received:\n
      Pizza: ${order.getPizzaName()}\n
      Options: ${order.getOptions().join(',') || 'none'}\n
      Total price: ${order.getPrice()}$\n
      Order status: ${order.getStatus()}\n
    `);
    super.handle(order);
  }
}

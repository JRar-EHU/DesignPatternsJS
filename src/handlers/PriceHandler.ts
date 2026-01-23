import OrderHandler from './OrderHandler';
import { IOrder } from '../order/IOrder';

export default class PriceHandler extends OrderHandler {
  handle(order: IOrder): void {
    console.log('Total price:', order.getPrice());
    super.handle(order);
  }
}

import { IOrder } from '../order/IOrder';

export default abstract class OrderHandler {
  private next?: OrderHandler;

  setNext(handler: OrderHandler): OrderHandler {
    this.next = handler;
    return handler;
  }

  handle(order: IOrder): void {
    if (this.next) {
      this.next.handle(order);
    }
  }
}

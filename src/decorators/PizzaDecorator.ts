import { IOrder } from '../order/IOrder';

export default abstract class PizzaDecorator implements IOrder {
  protected constructor(protected order: IOrder) {}

  getPizzaName(): string {
    return this.order.getPizzaName();
  }

  getPrice(): number {
    return this.order.getPrice();
  }

  getStock(): number {
    return this.order.getStock();
  }

  getOptions(): string[] {
    return this.order.getOptions();
  }

  setStatus(status: string): void {
    this.order.setStatus(status);
  }

  getStatus(): string {
    return this.order.getStatus();
  }
}

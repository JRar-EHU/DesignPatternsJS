import { IOrder } from './IOrder';
import Pizza from '../data/Pizza';

export default class PizzaOrder implements IOrder {
  constructor(private pizza: Pizza) {}

  private status = 'created';

  private options: string[] = [];

  getPizzaName(): string {
    return this.pizza.name;
  }

  getPrice(): number {
    return this.pizza.price;
  }

  getOptions(): string[] {
    return this.options;
  }

  setStatus(status: string): void {
    this.status = status;
  }

  getStatus(): string {
    return this.status;
  }

  getStock(): number {
    return this.pizza.stock;
  }
}

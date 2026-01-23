import OrderHandler from './OrderHandler';
import { PIZZAS } from '../data/data';
import InvalidDataError from '../errors/InvalidDataError';
import { IOrder } from '../order/IOrder';

export default class StockCheckHandler extends OrderHandler {
  handle(order: IOrder): void {
    const pizza = PIZZAS.find((p) => p.name === order.getPizzaName());

    if (!pizza || pizza.stock <= 0) {
      throw new InvalidDataError(`${order.getPizzaName()} is out of stock or nonexistent`);
    }
    super.handle(order);
  }
}

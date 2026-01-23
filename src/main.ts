import ConsoleInput from './utils/ConsoleInput';
import InputHelper from './utils/InputHelper';
import Pizza from './data/Pizza';
import { PIZZAS, TOPPINGS } from './data/data';
import Topping from './data/Toppings';
import PizzaOrder from './order/PizzaOrder';
import { IOrder } from './order/IOrder';
import StockCheckHandler from './handlers/StockHandler';
import PriceHandler from './handlers/PriceHandler';
import CompleteOrderHandler from './handlers/CompletionHandler';

async function main() {
  const input = ConsoleInput.getInstance();
  const inputHelper = new InputHelper(input);
  const pizzas: Pizza[] = PIZZAS.map((p) => new Pizza(p.name, p.price, p.stock));
  const toppingsList: Topping[] = TOPPINGS.map((t) => new Topping(t.name, t.price));

  try {
    const pizza = await inputHelper.choosePizza(pizzas);

    let order: IOrder = new PizzaOrder(pizza);
    console.log(`Order ${order.getStatus()}\n`);
    order = await inputHelper.chooseToppings(order, toppingsList);
    order = await inputHelper.choosePromoCode(order);
    order = await inputHelper.chooseWrapping(order);

    const stockHandler = new StockCheckHandler();
    const priceHandler = new PriceHandler();
    const completeOrderHandler = new CompleteOrderHandler();

    stockHandler.setNext(priceHandler).setNext(completeOrderHandler);
    stockHandler.handle(order);
  } catch (error) {
    console.error('Order failed\n', error);
  } finally {
    input.close();
  }
}

main();

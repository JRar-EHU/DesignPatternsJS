import ConsoleInput from './ConsoleInput';
import Pizza from '../data/Pizza';
import { IOrder } from '../order/IOrder';
import Topping from '../data/Toppings';
import ToppingsDecorator from '../decorators/ToppingsDecorator';
import PromoCodeDecorator from '../decorators/PromocodeDecorator';
import HolidayWrapDecorator from '../decorators/HolidayWrapDecorator';

export default class InputHelper {
  constructor(private input: ConsoleInput) {}

  async choosePizza(pizzas: Pizza[]): Promise <Pizza> {
    let pizzaData: Pizza | undefined;
    while (true) {
      console.log('Pizzas: ', pizzas.map((p) => `${p.name} ${p.price}$`).join(', '));
      const input = await this.input.ask('Choose: ');
      pizzaData = pizzas.find((p) => p.name.toLowerCase() === input.toLowerCase());
      if (!pizzaData || pizzaData.stock <= 0) {
        console.log('No such pizza or out of stock');
        continue;
      }
      console.log(`"${pizzaData.name}" it is.\n`);
      break;
    }
    return pizzaData;
  }

  async chooseToppings(order: IOrder, toppingsList: Topping[]): Promise<IOrder> {
    console.log('Toppings: ', toppingsList.map((t) => `${t.name} ${t.price}$`).join(', '));
    const input = await this.input.ask('Choose toppings (Enter to skip): ');

    const selectedToppings = toppingsList.filter((t) => input
      .trim()
      .toLowerCase()
      .split(',')
      .map((n) => n.trim())
      .includes(t.name.toLowerCase()));

    if (selectedToppings.length > 0) {
      const decoratedOrder = new ToppingsDecorator(order, selectedToppings);
      console.log(`Toppings: ${decoratedOrder.getOptions().join(', ')}\n`);
      return decoratedOrder;
    }
    console.log('No toppings it is..\n');
    return order;
  }

  async choosePromoCode(order: IOrder): Promise<IOrder> {
    const promoInput = await this.input.ask('Enter promo code: ');
    if (promoInput.toUpperCase() === 'PIZZA10') {
      console.log('Promo code activated\n');
      return new PromoCodeDecorator(order, 10);
    }
    console.log('No promo code or wrong one.\n');
    return order;
  }

  async chooseWrapping(order: IOrder): Promise<IOrder> {
    const wrapping = await this.input.askYesNo('Add holiday wrapping? (+1$)');
    if (wrapping) {
      console.log('Now it`s look nice!\n');
      return new HolidayWrapDecorator(order, true);
    }
    console.log('Just a regular box :(\n');
    return order;
  }
}

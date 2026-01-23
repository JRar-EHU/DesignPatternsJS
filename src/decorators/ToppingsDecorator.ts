import PizzaDecorator from './PizzaDecorator';

export default class ToppingsDecorator extends PizzaDecorator {
  constructor(
    order: PizzaDecorator['order'], // тип поля order из родительского класса
    private toppings: { name: string; price: number }[],
  ) {
    super(order);
  }

  getPrice(): number {
    const toppingsPrice = this.toppings.reduce((sum, t) => sum + t.price, 0);
    return super.getPrice() + toppingsPrice;
  }

  getOptions(): string[] {
    const toppingsNames = this.toppings.map((t) => t.name);
    return [...super.getOptions(), ...toppingsNames];
  }
}

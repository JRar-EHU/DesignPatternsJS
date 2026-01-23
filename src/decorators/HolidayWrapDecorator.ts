import PizzaDecorator from './PizzaDecorator';

export default class HolidayWrapDecorator extends PizzaDecorator {
  constructor(
    order: PizzaDecorator['order'],
    private wrap: boolean,
  ) {
    super(order);
  }

  getPrice(): number {
    const basePrice = super.getPrice();
    return this.wrap ? basePrice + 1 : basePrice;
  }

  getOptions(): string[] {
    return this.wrap ? [...super.getOptions(), 'Holiday Wrapping'] : super.getOptions();
  }
}

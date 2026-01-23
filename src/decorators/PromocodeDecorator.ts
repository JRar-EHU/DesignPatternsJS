import PizzaDecorator from './PizzaDecorator';

export default class PromoCodeDecorator extends PizzaDecorator {
  constructor(
    order: PizzaDecorator['order'],
    private discountPercent: number,
  ) {
    super(order);
  }

  getPrice(): number {
    const basePrice = super.getPrice();
    const discount = basePrice * (this.discountPercent / 100);
    return basePrice - discount;
  }

  getOptions(): string[] {
    return [...super.getOptions(), `Discount ${this.discountPercent}%`];
  }
}

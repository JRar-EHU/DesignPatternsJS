export default class Pizza {
  readonly #name: string;

  readonly #price: number;

  readonly #stock: number;

  constructor(name: string, price: number, stock: number) {
    this.#name = name;
    this.#price = price;
    this.#stock = stock;
  }

  get name(): string {
    return this.#name;
  }

  get price(): number {
    return this.#price;
  }

  get stock(): number {
    return this.#stock;
  }
}

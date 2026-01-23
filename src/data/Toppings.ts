export default class Topping {
  readonly #name: string;

  readonly #price: number;

  constructor(name: string, price: number) {
    this.#name = name;
    this.#price = price;
  }

  get name(): string {
    return this.#name;
  }

  get price(): number {
    return this.#price;
  }

  toString() {
    return `${this.#name} ${this.#price}`;
  }
}

export interface IOrder {
  getPizzaName(): string;
  getPrice(): number;
  getStock(): number;
  getOptions(): string[];
  setStatus(status: string): void;
  getStatus(): string;
}

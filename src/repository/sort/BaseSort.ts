export default abstract class BaseSort {
  protected readonly order: 'asc' | 'desc';

  constructor(order: 'asc' | 'desc' = 'asc') {
    this.order = order;
  }

  protected applyOrder(result: number): number {
    return this.order === 'asc' ? result : -result;
  }
}

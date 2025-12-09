import IComparator from './IComparator';
import Shape from '../../entities/Shape';
import BaseSort from './BaseSort';

export default class SortByFirstXOrY extends BaseSort implements IComparator {
  constructor(
    private readonly axis: 'x' | 'y' = 'x',
    order: 'asc' | 'desc' = 'asc',
  ) {
    super(order);
  }

  compare(a: Shape, b: Shape): number {
    const valA = a.points[0][this.axis];
    const valB = b.points[0][this.axis];

    if (valA === valB) {
      return this.applyOrder(a.id.localeCompare(b.id));
    }

    return this.applyOrder(valA - valB);
  }
}

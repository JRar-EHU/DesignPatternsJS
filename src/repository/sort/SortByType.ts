import IComparator from './IComparator';
import Shape from '../../entities/Shape';
import BaseSort from './BaseSort';

export default class SortByType extends BaseSort implements IComparator {
  compare(a: Shape, b: Shape): number {
    const result = a.type.localeCompare(b.type);
    return this.applyOrder(result);
  }
}

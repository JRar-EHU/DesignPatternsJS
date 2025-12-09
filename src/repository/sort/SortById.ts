import Shape from '../../entities/Shape';
import IComparator from './IComparator';
import BaseSort from './BaseSort';

export default class SortById extends BaseSort implements IComparator {
  compare(a: Shape, b: Shape): number {
    const result = a.id.localeCompare(b.id);
    return this.applyOrder(result);
  }
}

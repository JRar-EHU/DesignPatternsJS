import Shape from '../entities/Shape';
import ISpecification from './specifications/ISpecification';
import IComparator from './sort/IComparator';
import logger from '../logger/Logger';

export default class Repository {
  private shapes: Shape[] = [];

  add(shape: Shape) {
    this.shapes.push(shape);
  }

  remove(id: string): boolean {
    const index = this.shapes.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.shapes.splice(index, 1);
    return true;
  }

  find(spec: ISpecification): Shape[] {
    const shapes = this.shapes.filter((shape) => spec.isSatisfiedBy(shape));
    if (shapes.length === 0) {
      logger.error('No shapes found');
      return [];
    }
    return shapes;
  }

  sort(comparator: IComparator): Shape[] {
    return this.shapes.sort((a, b) => comparator.compare(a, b));
  }

  getAll() {
    return [...this.shapes];
  }
}

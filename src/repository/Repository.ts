import Shape from '../entities/Shape';
import ISpecification from './specifications/ISpecification';
import IComparator from './sort/IComparator';
import logger from '../logger/Logger';
import IObserver from '../observer/IObserver';

export default class Repository {
  private shapes: Shape[] = [];

  observers: IObserver[] = [];

  add(shape: Shape) {
    this.shapes.push(shape);
    this.notify(shape);
  }

  remove(id: string): boolean {
    const index = this.shapes.findIndex((s) => s.id === id);
    if (index === -1) return false;
    const [removed] = this.shapes.splice(index, 1);
    this.observers.forEach((o) => o.remove?.(removed));
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

  update(shape: Shape) {
    this.notify(shape);
  }

  attach(observer: IObserver) {
    this.observers.push(observer);
  }

  private notify(shape: Shape) {
    this.observers.forEach((o) => o.update(shape));
  }
}

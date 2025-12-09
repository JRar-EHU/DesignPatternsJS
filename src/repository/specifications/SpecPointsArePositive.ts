import ISpecification from './ISpecification';
import Shape from '../../entities/Shape';

export default class SpecPointsArePositive implements ISpecification {
  constructor(private readonly axis?: 'x' | 'y' | 'z') {}

  isSatisfiedBy(shape: Shape): boolean {
    if (this.axis) {
      return shape.points.every((point) => point[this.axis!] >= 0);
    }
    return shape.points.every(
      (p) => p.x >= 0 && p.y >= 0 && p.z >= 0,
    );
  }
}

import Shape from '../../entities/Shape';
import ISpecification from './ISpecification';

export default class SpecId implements ISpecification {
  constructor(private id: string) {}

  isSatisfiedBy(shape: Shape): boolean {
    return shape.id === this.id;
  }
}

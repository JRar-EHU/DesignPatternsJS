import ISpecification from './ISpecification';
import Shape from '../../entities/Shape';

export default class SpecType implements ISpecification {
  constructor(private type: string) {}

  isSatisfiedBy(shape: Shape): boolean {
    return shape.type === this.type;
  }
}

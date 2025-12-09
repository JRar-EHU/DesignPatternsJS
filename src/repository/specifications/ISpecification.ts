import Shape from '../../entities/Shape';

export default interface ISpecification {
  isSatisfiedBy(shape: Shape): boolean;
}

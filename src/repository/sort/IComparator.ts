import Shape from '../../entities/Shape';

export default interface IComparator {
  compare(a: Shape, b: Shape): number;
}

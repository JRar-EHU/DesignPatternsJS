import Shape from '../entities/Shape';

export default interface IObserver {
  update(shape: Shape): void;
  remove?(shape: Shape): void;
}

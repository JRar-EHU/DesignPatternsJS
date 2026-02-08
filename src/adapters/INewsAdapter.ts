import INewsDTO from './INewsDTO';

export default interface INewsAdapter<T> {
  adapt(data: T): INewsDTO;
}

import INewsDTO from './INewsDTO';

export default interface INewsMapper<T> {
  mapToDto(data: T): INewsDTO;
}

import INewsDTO from './INewsDTO';

export default interface INewsAdapter {
  getNews(): INewsDTO[];
}

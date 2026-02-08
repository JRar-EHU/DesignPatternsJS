import News from '../news/News';

export default interface IObserver {
  update(news: News): void;
}

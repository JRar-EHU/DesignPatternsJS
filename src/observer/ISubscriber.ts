import News from '../news/News';

export default interface ISubscriber {
  update(news: News): void;
}

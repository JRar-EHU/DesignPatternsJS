import ISubscriber from './ISubscriber';
import News from '../news/News';

export default interface IPublisher {
  attach(observer: ISubscriber): void;
  notify(news: News): void;
}

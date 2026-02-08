import IObserver from './IObserver';
import News from '../news/News';

export default interface IObserverSubject {
  attach(observer: IObserver): void;
  notify(news: News): void;
}

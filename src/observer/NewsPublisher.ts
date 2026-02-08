import News from '../news/News';
import IObserver from './IObserver';
import IObserverSubject from './IObserverSubject';

export default class NewsPublisher implements IObserverSubject {
  private observers: IObserver[] = [];

  public newsList: News[] = [];

  addNews(news: News): void {
    this.newsList.push(news);
    this.notify(news);
  }

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log('Subject: observer already attached');
      return;
    }
    console.log('Subject: observer attached.');
    this.observers.push(observer);
  }

  public notify(news: News): void {
    this.observers.forEach((observer) => observer.update(news));
  }
}

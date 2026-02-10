import News from '../news/News';
import ISubscriber from './ISubscriber';
import IPublisher from './IPublisher';

export default class NewsPublisher implements IPublisher {
  private observers: ISubscriber[] = [];

  public newsList: News[] = [];

  addNews(news: News): void {
    this.newsList.push(news);
    this.notify(news);
  }

  public attach(observer: ISubscriber): void {
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

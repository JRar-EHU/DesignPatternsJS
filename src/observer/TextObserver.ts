import IObserver from './IObserver';
import News from '../news/News';

export default class TextObserver implements IObserver {
  public textNews: News[] = [];

  update(news: News) {
    if (news.getType() === 'text') {
      this.textNews.push(news);
    }
  }
}

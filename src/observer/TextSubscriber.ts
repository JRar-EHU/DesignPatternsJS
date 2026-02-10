import ISubscriber from './ISubscriber';
import News from '../news/News';

export default class TextSubscriber implements ISubscriber {
  public textNews: News[] = [];

  update(news: News) {
    if (news.getType() === 'text') {
      this.textNews.push(news);
    }
  }
}

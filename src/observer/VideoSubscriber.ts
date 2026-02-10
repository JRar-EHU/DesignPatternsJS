import ISubscriber from './ISubscriber';
import News from '../news/News';

export default class VideoSubscriber implements ISubscriber {
  public videoNews: News[] = [];

  update(news: News) {
    if (news.getType() === 'video') {
      this.videoNews.push(news);
    }
  }
}

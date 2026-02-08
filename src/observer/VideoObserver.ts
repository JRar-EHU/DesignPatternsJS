import IObserver from './IObserver';
import News from '../news/News';

export default class VideoObserver implements IObserver {
  public videoNews: News[] = [];

  update(news: News) {
    if (news.getType() === 'video') {
      this.videoNews.push(news);
    }
  }
}

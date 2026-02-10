import ISubscriber from './ISubscriber';
import News from '../news/News';

export default class AdsSubscriber implements ISubscriber {
  public adsNews: News[] = [];

  update(news: News) {
    if (news.getType() === 'videoAd' || news.getType() === 'textAd') {
      this.adsNews.push(news);
    }
  }
}

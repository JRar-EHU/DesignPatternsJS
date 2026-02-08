import IObserver from './IObserver';
import News from '../news/News';

export default class AdsObserver implements IObserver {
  public adsNews: News[] = [];

  update(news: News) {
    if (news.getType() === 'videoAd' || news.getType() === 'textAd') {
      this.adsNews.push(news);
    }
  }
}

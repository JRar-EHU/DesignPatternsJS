import News from '../News';

export default class TextAdsNews extends News {
  private readonly sponsor: string;

  constructor(
    title: string,
    text: string,
    sponsor: string,
  ) {
    super('textAd', title, text);
    this.sponsor = sponsor;
  }

  getSponsor(): string {
    return this.sponsor;
  }
}

import News from '../News';

export default class VideoAdsNews extends News {
  private readonly videoUrl: string;

  private readonly sponsor: string;

  constructor(
    title: string,
    text: string,
    sources: string[],
    videoUrl: string,
    sponsor: string,
  ) {
    super('videoAd', title, text, sources);
    this.videoUrl = videoUrl;
    this.sponsor = sponsor;
  }

  getVideoUrl(): string {
    return this.videoUrl;
  }

  getSponsor(): string {
    return this.sponsor;
  }
}

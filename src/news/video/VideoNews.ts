import News from '../News';

export default class VideoNews extends News {
  private readonly videoUrl: string;

  constructor(
    title: string,
    text: string,
    sources: string[],
    videoUrl: string,
  ) {
    super('video', title, text, sources);
    this.videoUrl = videoUrl;
  }

  getVideoUrl(): string {
    return this.videoUrl;
  }
}

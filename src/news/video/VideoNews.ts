import News from '../News';

export default class VideoNews extends News {
  private readonly videoUrl: string;

  constructor(
    title: string,
    text: string,
    videoUrl: string,
  ) {
    super('video', title, text);
    this.videoUrl = videoUrl;
  }

  getVideoUrl(): string {
    return this.videoUrl;
  }
}

import News from '../News';

export default class TextNews extends News {
  private readonly isRumor: boolean;

  private readonly sources: string[];

  constructor(
    title: string,
    text: string,
    sources: string[],
    isRumor: boolean,
  ) {
    super('text', title, text);
    this.sources = sources;
    this.isRumor = isRumor;
  }

  getIsRumor(): boolean {
    return this.isRumor;
  }

  getSources(): string[] {
    return this.sources;
  }
}

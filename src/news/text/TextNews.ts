import News from '../News';

export default class TextNews extends News {
  private readonly isRumor: boolean;

  constructor(
    title: string,
    text: string,
    sources: string[],
    isRumor: boolean,
  ) {
    super('text', title, text, sources);
    this.isRumor = isRumor;
  }

  getIsRumor(): boolean {
    return this.isRumor;
  }
}

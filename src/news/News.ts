export default abstract class News {
  private readonly type: string;

  readonly title: string;

  readonly text: string;

  readonly sources: string[];

  protected constructor(
    type: string,
    title: string,
    text: string,
    sources: string[],
  ) {
    this.type = type;
    this.title = title;
    this.text = text;
    this.sources = sources;
  }

  getType(): string {
    return this.type;
  }
}

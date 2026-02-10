export default abstract class News {
  private readonly type: string;

  readonly title: string;

  readonly text: string;

  protected constructor(
    type: string,
    title: string,
    text: string,
  ) {
    this.type = type;
    this.title = title;
    this.text = text;
  }

  getType(): string {
    return this.type;
  }
}

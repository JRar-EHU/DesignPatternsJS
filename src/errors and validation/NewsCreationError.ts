export default class NewsCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NewsCreationError';
  }
}

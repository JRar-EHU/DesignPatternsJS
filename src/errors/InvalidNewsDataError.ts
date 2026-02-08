export default class InvalidNewsDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidNewsDataError';
  }
}

import pino from 'pino';

export abstract class BaseFactory {
  protected static logger = pino({ level: 'error' });

  protected static safely<T>(fn: () => T): T {
    try {
      return fn();
    } catch (err) {
      this.logger.error({ err }, 'Factory error');
      throw err;
    }
  }

  protected static parseNumbers(line: string): { id: string; nums: number[] } {
    const parts = line.trim().split(/\s+/);
    const id = parts[0];
    const nums = parts.slice(1).map(Number);
    return { id, nums };
  }
}

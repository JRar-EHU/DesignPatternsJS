import Shape from '../entities/Shape';
import { SPACE } from '../data/constants';
import logger from '../logger/Logger';
import ValidationError from '../errors/ValidationError';
import InvalidDataError from '../errors/InvalidDataError';

export default abstract class BaseFactory {
  private static registry = new Map<string, typeof BaseFactory>();

  static register(type: string, factory: typeof BaseFactory) {
    this.registry.set(type, factory);
  }

  static create(line: string): Shape {
    const type = line.split(SPACE)[0].slice(0, 2);
    const Factory = this.registry.get(type);
    if (!Factory) {
      logger.error(`Unknown shape type: ${type}`);
      throw new InvalidDataError(`Unknown shape type: ${type}`);
    }
    return Factory.createShape(line);
  }

  protected static createShape(_line: string): Shape {
    throw new ValidationError('Method not implemented in concrete factory');
  }

  protected static parseNumbers(line: string): { id: string; nums: number[] } {
    const parts = line.trim().split(SPACE);
    const id = parts[0];
    const nums = parts.slice(1).map(Number);
    return { id, nums };
  }
}

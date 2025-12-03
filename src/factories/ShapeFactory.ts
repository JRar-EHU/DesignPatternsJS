import Shape from '../entities/Shape';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';
import BaseFactory from './BaseFactory';

export default class ShapeFactory {
  private registry: Map<string, (line: string) => BaseFactory>;

  constructor(
    registry: Map<string, (line: string) => BaseFactory> = new Map(),
  ) {
    this.registry = registry;
  }

  create(line: string): Shape {
    const type = line.trim().substring(0, 2).toUpperCase();
    const Factory = this.registry.get(type);
    if (!Factory) {
      logger.error(`Unknown shape type: ${type}`);
      throw new InvalidDataError(`Unknown shape type: ${type}`);
    }
    return Factory(line).createShape();
  }

  register(prefix: string, builder: (line: string) => BaseFactory): void {
    this.registry.set(prefix.toUpperCase(), builder);
  }
}

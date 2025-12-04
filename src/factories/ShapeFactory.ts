import Shape from '../entities/Shape';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';
import BaseFactory from './BaseFactory';

export default class ShapeFactory {
  private registry: Map<string, BaseFactory>;

  constructor(
    registry: Map<string, BaseFactory> = new Map(),
  ) {
    this.registry = registry;
  }

  create(line: string): Shape {
    const type = line
      .trim()
      .substring(0, 2)
      .toUpperCase();
    const Factory = this.registry.get(type);
    if (!Factory) {
      logger.error(`Unknown shape type: ${type}`);
      throw new InvalidDataError(`Unknown shape type: ${type}`);
    }
    return Factory.createShape(line);
  }

  register(type: string, factory: BaseFactory) {
    this.registry.set(type, factory);
  }
}

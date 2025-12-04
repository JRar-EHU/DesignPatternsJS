import BaseFactory from './BaseFactory';
import Pyramid from '../entities/Pyramid';
import PyramidValidator from '../validation/PyramidValidator';
import Point from '../entities/Point';
import logger from '../logger/Logger';

export default class PyramidFactory extends BaseFactory {
  constructor() {
    super('PY', PyramidValidator);
    logger.info('Pyramid Factory created!');
  }

  createShape(line: string): Pyramid {
    const { id, nums } = this.parseAndValidate(line);
    const [bx1, by1, bz1, bx2, by2, bz2, ax, ay, az] = nums;
    return new Pyramid(
      id,
      new Point(bx1, by1, bz1),
      new Point(bx2, by2, bz2),
      new Point(ax, ay, az),
    );
  }
}

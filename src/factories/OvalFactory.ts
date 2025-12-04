import BaseFactory from './BaseFactory';
import Oval from '../entities/Oval';
import OvalValidator from '../validation/OvalValidator';
import Point from '../entities/Point';
import logger from '../logger/Logger';

export default class OvalFactory extends BaseFactory {
  constructor() {
    super('OV', OvalValidator);
    logger.info('Oval Factory created!');
  }

  createShape(line: string): Oval {
    const { id, nums } = this.parseAndValidate(line);
    const [x1, y1, x2, y2] = nums;
    return new Oval(
      id,
      new Point(x1, y1),
      new Point(x2, y2),
    );
  }
}

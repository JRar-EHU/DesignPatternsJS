import BaseValidator from './BaseValidator';
import ValidationError from '../errors/ValidationError';
import Point from '../entities/Point';
import logger from '../logger/Logger';

export default class OvalUpdateValidator extends BaseValidator {
  constructor(private p1: Point, private p2: Point) {
    super();
  }

  validate(): void {
    if (this.p1.x === this.p2.x || this.p1.y === this.p2.y) {
      logger.error('Oval cannot be formed by collinear points.');
      throw new ValidationError('Oval cannot be formed by collinear points.');
    }
  }
}

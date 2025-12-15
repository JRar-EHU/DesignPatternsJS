import BaseValidator from './BaseValidator';
import ValidationError from '../errors/ValidationError';
import Point from '../entities/Point';
import logger from '../logger/Logger';

export default class PyramidUpdateValidator extends BaseValidator {
  constructor(private p1: Point, private p2: Point, private apex: Point) {
    super();
  }

  validate(): void {
    if (this.p1.x === this.p2.x && this.p1.y === this.p2.y) {
      logger.error('Pyramid base points cannot be identical.');
      throw new ValidationError('Pyramid base points cannot be identical.');
    }

    // if (
    //     Math.abs((this.p2.y - this.p1.y) * (this.apex.z - this.p1.z) - (this.p2.z - this.p1.z) * (this.apex.y - this.p1.y)) === 0 &&
    //     Math.abs((this.p2.z - this.p1.z) * (this.apex.x - this.p1.x) - (this.p2.x - this.p1.x) * (this.apex.z - this.p1.z)) === 0 &&
    //     Math.abs((this.p2.x - this.p1.x) * (this.apex.y - this.p1.y) - (this.p2.y - this.p1.y) * (this.apex.x - this.p1.x)) === 0
    // ) {
    //     logger.error('Apex is collinear with base points.');
    //     throw new ValidationError('Apex is collinear with base points.');
    // }

    const v1 = {
      x: this.p2.x - this.p1.x,
      y: this.p2.y - this.p1.y,
      z: this.p2.z - this.p1.z,
    };

    const v2 = {
      x: this.apex.x - this.p1.x,
      y: this.apex.y - this.p1.y,
      z: this.apex.z - this.p1.z,
    };

    const cross = {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };

    if (cross.x === 0 && cross.y === 0 && cross.z === 0) {
      logger.error('Apex is collinear with base points.');
      throw new ValidationError('Apex is collinear with base points.');
    }

    if (this.p1.z === this.apex.z && this.p2.z === this.apex.z) {
      logger.error('Apex must not lie on the same Z level as base.');
      throw new ValidationError('Apex must not lie on the same Z level as base.');
    }
  }
}

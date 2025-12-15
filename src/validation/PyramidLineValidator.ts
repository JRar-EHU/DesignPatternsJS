import BaseValidator from './BaseValidator';
import ValidationError from '../errors/ValidationError';
import { SPACE } from '../data/constants';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';
import { checkNumbers } from '../utils/utils';

export default class PyramidLineValidator extends BaseValidator {
  constructor(private line: string) {
    super();
  }

  validate(): void {
    const parts = this.line.trim().split(SPACE);

    if (parts.length !== 10) {
      logger.error('Pyramid requires 1 ID + 9 numeric values.');
      throw new InvalidDataError('Pyramid requires 1 ID + 9 numeric values.');
    }

    const numericParts = parts.slice(1);
    checkNumbers(numericParts);

    const nums = numericParts.map(Number);

    const [bx1, by1, bz1, bx2, by2, bz2, ax, ay, az] = nums;
    if (Math.abs((by2 - by1) * (az - bz1) - (bz2 - bz1) * (ay - by1)) === 0
        && Math.abs((bz2 - bz1) * (ax - bx1) - (bx2 - bx1) * (az - bz1)) === 0
        && Math.abs((bx2 - bx1) * (ay - by1) - (by2 - by1) * (ax - bx1)) === 0) {
      logger.error('Apex is collinear with base points.');
      throw new ValidationError('Apex is collinear with base points.');
    }

    if (bx1 === bx2 && by1 === by2 && bz1 === bz2) {
      logger.error('Pyramid base points cannot be identical.');
      throw new ValidationError('Pyramid base points cannot be identical.');
    }
    if (az === bz1) {
      logger.error('Apex must not lie on the same Z level as base.');
      throw new ValidationError('Apex must not lie on the same Z level as base.');
    }
  }
}

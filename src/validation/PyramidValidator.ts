import BaseValidator from './BaseValidator';
import ValidationError from '../errors/ValidationError';
import { SPACE } from '../data/constants';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';

export default class PyramidValidator extends BaseValidator {
  static validateLine(line: string): void {
    const parts = line.trim().split(SPACE);

    if (parts.length !== 10) {
      logger.error('Pyramid requires 1 ID + 9 numeric values.');
      throw new InvalidDataError('Pyramid requires 1 ID + 9 numeric values.');
    }

    const numericParts = parts.slice(1);
    BaseValidator.checkNumbers(numericParts);

    const nums = numericParts.map(Number);

    const [bx1, by1, bz1, bx2, by2, bz2, _ax, _ay, az] = nums;
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

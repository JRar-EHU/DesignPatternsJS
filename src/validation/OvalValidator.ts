import BaseValidator from './BaseValidator';
import ValidationError from '../errors/ValidationError';
import { SPACE } from '../data/constants';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';

export default class OvalValidator extends BaseValidator {
  static validateLine(line: string): void {
    const parts = line.trim().split(SPACE);

    if (parts.length !== 5) {
      logger.error('Oval requires 1 ID + 4 numeric values.');
      throw new InvalidDataError('Oval requires 1 ID + 4 numeric values.');
    }

    const numericParts = parts.slice(1);

    BaseValidator.checkNumbers(numericParts);

    const [x1, y1, x2, y2] = numericParts.map(Number);
    if (x1 === x2 || y1 === y2) {
      logger.error('Oval cannot be formed by collinear points.');
      throw new ValidationError('Oval cannot be formed by collinear points.');
    }
  }
}

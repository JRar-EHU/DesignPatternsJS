import { NUMBER_IS_CORRECT } from '../data/constants';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';

export default class BaseValidator {
  static checkNumbers(values: string[]): void {
    for (const num of values) {
      if (!NUMBER_IS_CORRECT.test(num)) {
        logger.error(`Invalid number: ${num}`);
        throw new InvalidDataError(`Invalid number: ${num}`);
      }
    }
  }
}

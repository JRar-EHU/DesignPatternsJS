import Shape from '../entities/Shape';
import BaseValidator from '../validation/BaseValidator';
import { parseNumbers } from '../utils/utils';

export default abstract class BaseFactory {
  protected readonly line: string;

  protected readonly id: string;

  protected readonly nums: number[];

  protected constructor(
    line: string,
    ValidatorClass: new (line: string) => BaseValidator,
  ) {
    this.line = line;
    new ValidatorClass(line).validateLine();
    const { id, nums } = parseNumbers(line);
    this.id = id;
    this.nums = nums;
  }
  abstract createShape(): Shape;
}

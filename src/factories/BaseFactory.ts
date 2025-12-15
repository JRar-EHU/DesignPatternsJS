import Shape from '../entities/Shape';
import BaseValidator from '../validation/BaseValidator';
import { parseNumbers } from '../utils/utils';

export default abstract class BaseFactory {
  protected constructor(
    protected readonly type: string,
    protected readonly ValidatorClass: new(line: string) => BaseValidator,
  ) {}

  protected parseAndValidate(line: string) {
    const validator = new this.ValidatorClass(line);
    validator.validate();
    return parseNumbers(line);
  }
  abstract createShape(line: string): Shape;
}

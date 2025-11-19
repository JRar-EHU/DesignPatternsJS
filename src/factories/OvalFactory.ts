import { BaseFactory } from './BaseFactory';
import { OvalValidator } from '../validation/OvalValidator';
import { Oval } from '../entities/Oval';
import { Point } from '../entities/Point';

export class OvalFactory extends BaseFactory {
  static create(line: string): Oval {
    return this.safely(() => {
      OvalValidator.validateLine(line);

      const { id, nums } = this.parseNumbers(line);
      const [x1, y1, z1, x2, y2, z2] = nums;

      return new Oval(
        id,
        new Point(x1, y1, z1),
        new Point(x2, y2, z2),
      );
    });
  }
}

import BaseFactory from './BaseFactory';
import Oval from '../entities/Oval';
import OvalValidator from '../validation/OvalValidator';
import Point from '../entities/Point';

export default class OvalFactory extends BaseFactory {
  protected static createShape(line: string): Oval {
    OvalValidator.validateLine(line);
    const { id, nums } = this.parseNumbers(line);
    const [x1, y1, x2, y2] = nums;
    return new Oval(
      id,
      new Point(x1, y1),
      new Point(x2, y2),
    );
  }
}

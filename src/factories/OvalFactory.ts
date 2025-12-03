import Oval from '../entities/Oval';
import Point from '../entities/Point';
import OvalValidator from '../validation/OvalValidator';
import BaseFactory from './BaseFactory';

export default class OvalFactory extends BaseFactory {
  constructor(line: string) {
    super(line, OvalValidator);
  }

  createShape(): Oval {
    const [x1, y1, x2, y2] = this.nums;
    return new Oval(
      this.id,
      new Point(x1, y1),
      new Point(x2, y2),
    );
  }
}

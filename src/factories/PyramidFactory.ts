import Pyramid from '../entities/Pyramid';
import Point from '../entities/Point';
import PyramidValidator from '../validation/PyramidValidator';
import BaseFactory from './BaseFactory';

export default class PyramidFactory extends BaseFactory {
  constructor(line: string) {
    super(line, PyramidValidator);
  }

  createShape(): Pyramid {
    const [bx1, by1, bz1, bx2, by2, bz2, ax, ay, az] = this.nums;
    return new Pyramid(
      this.id,
      new Point(bx1, by1, bz1),
      new Point(bx2, by2, bz2),
      new Point(ax, ay, az),
    );
  }
}

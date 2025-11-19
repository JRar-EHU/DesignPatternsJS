import Shape from './Shape';
import Point from './Point';

export default class Oval extends Shape {
  private type = 'Oval';

  public p1: Point;

  public p2: Point;

  constructor(id: string, p1: Point, p2: Point) {
    super(id);
    this.p1 = p1;
    this.p2 = p2;
  }
}

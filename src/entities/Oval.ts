import Shape from './Shape';
import Point from './Point';

export default class Oval extends Shape {
  public type = 'Oval';

  public p1: Point;

  public p2: Point;

  public points: Point[];

  constructor(id: string, p1: Point, p2: Point) {
    super(id);
    this.p1 = p1;
    this.p2 = p2;
    this.points = [p1, p2];
  }

  public setP1(point: Point) {
    this.p1 = point;
  }

  public setP2(point: Point) {
    this.p2 = point;
  }
}

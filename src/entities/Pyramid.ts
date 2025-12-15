import Shape from './Shape';
import Point from './Point';

export default class Pyramid extends Shape {
  public type = 'Pyramid';

  public p1: Point;

  public p2: Point;

  public apex: Point;

  public points: Point[];

  constructor(id: string, p1: Point, p2: Point, apex: Point) {
    super(id);
    this.p1 = p1;
    this.p2 = p2;
    this.apex = apex;
    this.points = [p1, p2, apex];
  }

  public setP1(point: Point) {
    this.p1 = point;
  }

  public setP2(point: Point) {
    this.p2 = point;
  }

  public setApex(apex: Point) {
    this.apex = apex;
  }
}

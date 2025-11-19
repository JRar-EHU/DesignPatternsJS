import Shape from './Shape';
import Point from './Point';

export default class Pyramid extends Shape {
  private type = 'Pyramid';

  public baseP1: Point;

  public baseP2: Point;

  public apex: Point;

  constructor(id: string, baseP1: Point, baseP2: Point, apex: Point) {
    super(id);
    this.baseP1 = baseP1;
    this.baseP2 = baseP2;
    this.apex = apex;
  }
}

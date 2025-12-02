import Pyramid from '../entities/Pyramid';
import Point from '../entities/Point';
import logger from '../logger/Logger';

export default class PyramidService {
  static surfaceArea(p: Pyramid): number {
    const base = this.baseArea(p);
    const side1 = this.triangleArea(p.baseP1, p.baseP2, p.apex);
    const side2 = this.triangleArea(p.baseP2, p.apex, p.baseP1);
    const side3 = this.triangleArea(p.apex, p.baseP1, p.baseP2);
    const result = base + side1 + side2 + side3;
    return result;
  }

  static volume(p: Pyramid): number {
    const base = this.baseArea(p);
    const height = Math.abs(p.apex.z - p.baseP1.z);
    const result = (1 / 3) * base * height;
    return result;
  }

  static isPyramid(p: Pyramid): boolean {
    const result = !this.areCollinear(p.baseP1, p.baseP2, new Point(p.baseP1.x, p.baseP2.y, p.baseP1.z));
    return result;
  }

  static isBaseOnCoordinatePlane(p: Pyramid): boolean {
    const result = p.baseP1.z === 0 && p.baseP2.z === 0;
    return result;
  }

  private static baseArea(p: Pyramid): number {
    const width = Math.abs(p.baseP2.x - p.baseP1.x);
    const height = Math.abs(p.baseP2.y - p.baseP1.y);
    return width * height;
  }

  private static triangleArea(a: Point, b: Point, c: Point): number {
    return (
      Math.abs(
        a.x * (b.y - c.y)
                + b.x * (c.y - a.y)
                + c.x * (a.y - b.y),
      ) / 2
    );
  }

  private static areCollinear(a: Point, b: Point, c: Point): boolean {
    return (
      a.x * (b.y - c.y)
            + b.x * (c.y - a.y)
            + c.x * (a.y - b.y)
    ) === 0;
  }
}

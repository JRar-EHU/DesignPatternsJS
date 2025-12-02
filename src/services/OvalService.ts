import Oval from '../entities/Oval';
import logger from '../logger/Logger';

export default class OvalService {
  static area(oval: Oval): number {
    const a = Math.abs(oval.p2.x - oval.p1.x) / 2;
    const b = Math.abs(oval.p2.y - oval.p1.y) / 2;
    const result = Math.PI * a * b;
    logger.info({ area: result }, 'Oval area calculated');
    return result;
  }

  static perimeter(oval: Oval): number {
    const a = Math.abs(oval.p2.x - oval.p1.x) / 2;
    const b = Math.abs(oval.p2.y - oval.p1.y) / 2;

    const h = ((a - b) ** 2) / ((a + b) ** 2);
    const result = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    logger.info({ perimeter: result }, 'Oval perimeter calculated');
    return result;
  }

  static isCircle(oval: Oval): boolean {
    const a = Math.abs(oval.p2.x - oval.p1.x);
    const b = Math.abs(oval.p2.y - oval.p1.y);
    const result = a === b;
    logger.info({ isCircle: result }, 'Circle check completed');
    return result;
  }

  static isOval(oval: Oval): boolean {
    const result = oval.p1.x !== oval.p2.x && oval.p1.y !== oval.p2.y;
    logger.info({ isOval: result }, 'Oval check completed');
    return result;
  }

  static intersectsOneAxis(oval: Oval, distance: number): boolean {
    const minX = Math.min(oval.p1.x, oval.p2.x);
    const maxX = Math.max(oval.p1.x, oval.p2.x);
    const minY = Math.min(oval.p1.y, oval.p2.y);
    const maxY = Math.max(oval.p1.y, oval.p2.y);

    const crossesX = minY <= distance && maxY >= distance;
    const crossesY = minX <= distance && maxX >= distance;

    const result = crossesX !== crossesY;
    logger.info({ result }, 'Axis intersection check completed');
    return result;
  }
}

import Oval from '../entities/Oval';
import logger from '../logger/Logger';

export default class OvalService {
  constructor(private o: Oval) {}

  area(): number {
    const a = Math.abs(this.o.p2.x - this.o.p1.x) / 2;
    const b = Math.abs(this.o.p2.y - this.o.p1.y) / 2;
    const result = Math.PI * a * b;
    logger.info(`${this.o.id} Area is ${result}`);
    return result;
  }

  perimeter(): number {
    const a = Math.abs(this.o.p2.x - this.o.p1.x) / 2;
    const b = Math.abs(this.o.p2.y - this.o.p1.y) / 2;
    const h = ((a - b) ** 2) / ((a + b) ** 2);
    const result = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    logger.info(`${this.o.id} Perimeter is ${result}`);
    return result;
  }

  isCircle(): boolean {
    const a = Math.abs(this.o.p2.x - this.o.p1.x);
    const b = Math.abs(this.o.p2.y - this.o.p1.y);
    const result = a === b;
    logger.info(`${this.o.id} Is circle: ${result}`);
    return result;
  }

  isOval(): boolean {
    const result = this.o.p1.x !== this.o.p2.x && this.o.p1.y !== this.o.p2.y;
    logger.info(`${this.o.id} Is oval: ${result}`);
    return result;
  }

  intersectsAnyAxis(): boolean {
    const minX = Math.min(this.o.p1.x, this.o.p2.x);
    const maxX = Math.max(this.o.p1.x, this.o.p2.x);
    const minY = Math.min(this.o.p1.y, this.o.p2.y);
    const maxY = Math.max(this.o.p1.y, this.o.p2.y);

    const crossesX = minY <= 0 && maxY >= 0;
    const crossesY = minX <= 0 && maxX >= 0;

    const result = crossesX || crossesY;
    logger.info(`${this.o.id} intersects any axis: ${result}`);
    return result;
  }

  runAllServices(): void {
    this.isOval();
    this.isCircle();
    this.area();
    this.perimeter();
    this.intersectsAnyAxis();
  }
}

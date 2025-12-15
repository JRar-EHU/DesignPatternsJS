import Pyramid from '../entities/Pyramid';
import { areCollinear3D, rectangleArea3D, triangleArea3D } from '../utils/utils';
import logger from '../logger/Logger';

export default class PyramidService {
  constructor(private p: Pyramid) {}

  surfaceArea(): number {
    const base = rectangleArea3D(this.p.p1, this.p.p2);
    const side1 = triangleArea3D(this.p.p1, this.p.p2, this.p.apex);
    const side2 = triangleArea3D(this.p.p2, this.p.apex, this.p.p1);
    const side3 = triangleArea3D(this.p.apex, this.p.p1, this.p.p2);

    const result = base + side1 + side2 + side3;
    logger.info(`${this.p.id} Surface area is ${result}`);
    return result;
  }

  volume(): number {
    const base = rectangleArea3D(this.p.p1, this.p.p2);
    const height = Math.abs(this.p.apex.z - this.p.p1.z);
    const result = (1 / 3) * base * height;
    logger.info(`${this.p.id} Volume is ${result}`);
    return result;
  }

  isPyramid(): boolean {
    const result = !areCollinear3D(this.p.p1, this.p.p2, this.p.apex);
    logger.info(`${this.p.id} Is pyramid: ${result}`);
    return result;
  }

  isPyBaseOnCoordinatePlane(): boolean {
    const result = this.p.p1.z === 0 && this.p.p2.z === 0;
    logger.info(`${this.p.id} Is pyramid base on coordinate plain: ${result}`);
    return result;
  }

  runAllServices() {
    this.isPyramid();
    this.volume();
    this.surfaceArea();
    this.isPyBaseOnCoordinatePlane();
  }
}

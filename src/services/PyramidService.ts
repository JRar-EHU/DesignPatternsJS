import Pyramid from '../entities/Pyramid';
import { triangleArea, areCollinear3D, rectangleArea } from '../utils/utils';
import logger from '../logger/Logger';

export default class PyramidService {
  constructor(private p: Pyramid) {}

  surfaceArea(): number {
    const base = rectangleArea(this.p.baseP1, this.p.baseP2);
    const side1 = triangleArea(this.p.baseP1, this.p.baseP2, this.p.apex);
    const side2 = triangleArea(this.p.baseP2, this.p.apex, this.p.baseP1);
    const side3 = triangleArea(this.p.apex, this.p.baseP1, this.p.baseP2);
    const result = base + side1 + side2 + side3;
    logger.info(`${this.p.id} Surface area is ${result}`);
    return result;
  }

  volume(): number {
    const base = rectangleArea(this.p.baseP1, this.p.baseP2);
    const height = Math.abs(this.p.apex.z - this.p.baseP1.z);
    const result = (1 / 3) * base * height;
    logger.info(`${this.p.id} Volume is ${result}`);
    return result;
  }

  isPyramid(): boolean {
    const result = !areCollinear3D(this.p.baseP1, this.p.baseP2, this.p.apex);
    logger.info(`${this.p.id} Is pyramid: ${result}`);
    return result;
  }

  isPyBaseOnCoordinatePlane(): boolean {
    const result = this.p.baseP1.z === 0 && this.p.baseP2.z === 0;
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

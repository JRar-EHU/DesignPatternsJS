import { readLines } from './utils/utils';
import logger from './logger/Logger';
import ShapeFactory from './factories/ShapeFactory';
import OvalFactory from './factories/OvalFactory';
import PyramidFactory from './factories/PyramidFactory';
import Oval from './entities/Oval';
import OvalService from './services/OvalService';
import Pyramid from './entities/Pyramid';
import PyramidService from './services/PyramidService';

const lines = readLines('./data/testData.txt');
const factory = new ShapeFactory();
factory.register('OV', (line) => new OvalFactory(line));
factory.register('PY', (line) => new PyramidFactory(line));

const shapes = lines
  .map((line) => {
    try {
      return factory.create(line);
    } catch {
      logger.error(`Failed to create object ${line}`);
      return null;
    }
  })
  .filter(Boolean);

logger.info(shapes);

shapes
  .filter((shape) => shape instanceof Oval)
  .forEach((shape) => new OvalService(shape).runAllServices());

shapes
  .filter((shape) => shape instanceof Pyramid)
  .forEach((shape) => new PyramidService(shape).runAllServices());

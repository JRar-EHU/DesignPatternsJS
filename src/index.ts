import './factories/registerFactories';
import BaseFactory from './factories/BaseFactory';
import readLines from './utils/fileReader';
import logger from './logger/Logger';

const lines = readLines('./data/testData.txt');

const shapes = lines
  .map((line) => {
    try {
      return BaseFactory.create(line);
    } catch {
      logger.error(`Failed to create object ${line}`);
      return null;
    }
  })
  .filter(Boolean);

logger.info(shapes);
// console.log(shapes, shapes.length);

import { readLines } from './utils/utils';
import logger from './logger/Logger';
import ShapeFactory from './factories/ShapeFactory';
import OvalFactory from './factories/OvalFactory';
import PyramidFactory from './factories/PyramidFactory';
import Oval from './entities/Oval';
import OvalService from './services/OvalService';
import Pyramid from './entities/Pyramid';
import PyramidService from './services/PyramidService';
import Repository from './repository/Repository';
import SpecId from './repository/specifications/SpecId';
import SortById from './repository/sort/SortById';
import Warehouse from './warehouse/Warehouse';
import ShapeObserver from './observer/ShapeObserver';
import Point from './entities/Point';
import PyramidUpdateService from './services/PyramidUpdateService';

const lines = readLines('./data/testData.txt');

const repository = new Repository();
logger.info('Repo created');

const warehouse = Warehouse.getInstance();
const observer = new ShapeObserver(warehouse);
logger.info('Observer created');
repository.attach(observer);
logger.info(`Observer attached ${repository.observers}`);

const factory = new ShapeFactory();
factory.register('OV', new OvalFactory());
factory.register('PY', new PyramidFactory());
const shapes = lines
  .map((line) => {
    try {
      const shape = factory.create(line);
      repository.add(shape);
      return shape;
    } catch {
      logger.error(`Failed to create object ${line}`);
      return null;
    }
  })
  .filter(Boolean);

logger.info(`Repo and shapes sync ${shapes.length === repository.getAll().length}`);

logger.info('\n \n TESTS STARTED \n');

logger.info(warehouse.get('OV1', 'area'));
logger.info(warehouse.get('PY1', 'surfaceArea'));

console.log(warehouse.getAll('PY1'));
repository.remove('PY1');
console.log(warehouse.getAll('PY1'));

const [targetPyramid] = repository
  .find(new SpecId('PY2'))
  .filter((s): s is Pyramid => s instanceof Pyramid);

const pyramidService = new PyramidService(targetPyramid);
const pyramidUpdateService = new PyramidUpdateService(repository);

console.log(targetPyramid);
console.log(pyramidService.surfaceArea());

pyramidUpdateService.update(
  targetPyramid,
  new Point(0, 0, 0),
  new Point(0, 10, 0),
  new Point(5, 5, 20),
);
console.log(targetPyramid);
console.log(pyramidService.surfaceArea());

shapes
  .filter((shape) => shape instanceof Oval)
  .forEach((shape) => new OvalService(shape).runAllServices());

shapes
  .filter((shape) => shape instanceof Pyramid)
  .forEach((shape) => new PyramidService(shape).runAllServices());

logger.info(`Initial repo: ${repository.getAll().map((s) => s.id)}`);
repository.remove('OV1');
logger.info(`OV1 removed: ${repository.getAll().map((s) => s.id)}`);
repository.add(shapes[0]!);
logger.info(`OV1 added: ${repository.getAll().map((s) => s.id)}`);

logger.info('Looking for OV3');
logger.info(repository.find(new SpecId('OV3')));

logger.info(`Unsorted repo: ${repository.getAll().map((s) => s.id)}`);
repository.sort(new SortById());
logger.info(`Sorted repo by id: ${repository.getAll().map((s) => s.id)}`);

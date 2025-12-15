import {
  describe, expect, test, beforeEach,
} from '@jest/globals';
import Repository from '../src/repository/Repository';
import Warehouse from '../src/warehouse/Warehouse';
import ShapeFactory from '../src/factories/ShapeFactory';
import ShapeObserver from '../src/observer/ShapeObserver';
import OvalFactory from '../src/factories/OvalFactory';
import PyramidFactory from '../src/factories/PyramidFactory';
import SpecId from '../src/repository/specifications/SpecId';
import Oval from '../src/entities/Oval';
import OvalUpdateService from '../src/services/OvalUpdateService';
import Point from '../src/entities/Point';
import Pyramid from '../src/entities/Pyramid';

describe('Warehouse + Observer', () => {
  let repository: Repository;
  let warehouse: Warehouse;
  let factory: ShapeFactory;

  beforeEach(() => {
    repository = new Repository();
    warehouse = Warehouse.getInstance();
    // @ts-ignore
    warehouse.data = new Map();

    const observer = new ShapeObserver(warehouse);
    repository.attach(observer);

    factory = new ShapeFactory();
    factory.register('OV', new OvalFactory());
    factory.register('PY', new PyramidFactory());

    const lines = [
      'OV1 0 0 10 10',
      'OV2 0 -1 4 1',
      'PY1 0 0 0 10 0 0 5 5 10',
      'PY2 0 0 0 10 0 0 3 7 8',
    ];

    lines.forEach((line) => {
      try {
        const shape = factory.create(line);
        repository.add(shape);
      } catch {
        console.log(`Failed to create object ${line}`);
      }
    });
  });

  test('Warehouse populated on add', () => {
    const ovalIsOval = warehouse.get('OV1', 'isOval');
    const pyVolume = warehouse.get('PY1', 'surfaceArea');
    expect(ovalIsOval).toBe(1);
    expect(pyVolume).toBeCloseTo(167.705);
  });

  test('Warehouse updates on shape update', () => {
    const [targetOval] = repository
      .find(new SpecId('OV1'))
      .filter((s): s is Oval => s instanceof Oval);

    const ovalUpdateService = new OvalUpdateService(repository);
    ovalUpdateService.update(
      targetOval,
      new Point(0, 0),
      new Point(1, 1),
    );

    const area = warehouse.get('OV1', 'area');
    const perimeter = warehouse.get('OV1', 'perimeter');
    expect(area).toBeCloseTo(0.785);
    expect(perimeter).toBeCloseTo(3.141);
  });

  test('Warehouse reflects removal', () => {
    const removed = repository.remove('OV2');
    expect(removed).toBe(true);
    const found = repository.find(new SpecId('OV2'));
    expect(found.length).toBe(0);
    const data = warehouse.getAll('OV2');
    expect(data).toBeUndefined();
  });

  test('Observer updates on repository update', () => {
    const [targetPyramid] = repository
      .find(new SpecId('PY1'))
      .filter((s): s is Pyramid => s instanceof Pyramid);

    targetPyramid.apex.z = 20;
    repository.update(targetPyramid);

    const newVolume = warehouse.get('PY1', 'surfaceArea');
    expect(newVolume).toBeCloseTo(309.232);
  });
});

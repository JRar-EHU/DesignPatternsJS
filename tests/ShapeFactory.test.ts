import { expect } from 'chai';
import ShapeFactory from '../src/factories/ShapeFactory';
import OvalFactory from '../src/factories/OvalFactory';
import PyramidFactory from '../src/factories/PyramidFactory';
import Oval from '../src/entities/Oval';
import Pyramid from '../src/entities/Pyramid';
import InvalidDataError from '../src/errors/InvalidDataError';
import { readLines } from '../src/utils/utils';

describe('Shape Factory', () => {
  const factory = new ShapeFactory();
  factory.register('OV', (line) => new OvalFactory(line));
  factory.register('PY', (line) => new PyramidFactory(line));

  const lines = readLines('../data/testData.txt');

  it('should create correct number of ovals and pyramids', () => {
    const shapes = lines.map((line) => {
      try {
        return factory.create(line);
      } catch {
        return null;
      }
    }).filter(Boolean);

    const ovals = shapes.filter((s) => s instanceof Oval);
    const pyramids = shapes.filter((s) => s instanceof Pyramid);

    expect(pyramids.length).to.equal(5);
    expect(ovals.length).to.equal(5);
  });

  it('should throw error on unknown or invalid lines', () => {
    const invalidLines = [
      'O6 1 2 3 4',
      'OV7 1 2 3',
      'OV8 a 2 3 4',
      'OV9 1 2 1 2',
      'P6 1 2 3 4 5 6 7 8 9',
      'PY7 1 2 3 4 5 6 7 8',
      'PY8 1 2 3 4 5 a 7 8 9',
      'PY9 1 2 3 1 2 3 1 2 3',
      'PY10 2 4 6 8 10 12 3 5 6',
    ];
    invalidLines.forEach((line) => {
      expect(() => factory.create(line)).to.throw(InvalidDataError);
    });
  });
});

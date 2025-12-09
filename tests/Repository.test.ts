import { describe, expect, test } from '@jest/globals';
import ShapeFactory from '../src/factories/ShapeFactory';
import OvalFactory from '../src/factories/OvalFactory';
import PyramidFactory from '../src/factories/PyramidFactory';
import Repository from '../src/repository/Repository';
import SpecId from '../src/repository/specifications/SpecId';
import SpecType from '../src/repository/specifications/SpecType';
import SpecPointsArePositive from '../src/repository/specifications/SpecPointsArePositive';
import SortById from '../src/repository/sort/SortById';
import SortByType from '../src/repository/sort/SortByType';
import SortByFirstXOrY from '../src/repository/sort/SortByFirstXOrY';

const factory = new ShapeFactory();
factory.register('OV', new OvalFactory());
factory.register('PY', new PyramidFactory());

const lines = [
  'OV1 0 0 10 10',
  'OV2 0 -1 4 1',
  'OV3 1 2 3 4',
  'PY1 0 0 0 10 0 0 5 5 10',
  'PY2 0 0 0 10 0 0 3 7 8',
  'PY3 -5 -5 0 5 -5 0 0 0 10',
  'O6 1 2 3 4',
];
const repo = new Repository();

lines.forEach((line) => {
  try {
    const shape = factory.create(line);
    repo.add(shape);
  } catch {
    console.log(`Failed to create object ${line}`);
  }
});

describe('Repository', () => {
  test('should remove from repo', () => {
    repo.remove('OV1');
    expect(repo.getAll().length).toBe(5);
  });

  test('should add to repo', () => {
    const shape = factory.create('OV1 0 0 10 10');
    repo.add(shape);
    expect(repo.getAll().length).toBe(6);
  });
});

describe('Repository search', () => {
  test('should find by SpecId', () => {
    const spec = new SpecId('OV2');
    const found = repo.find(spec);
    expect(found.length).toBe(1);
    expect(found[0].id).toBe('OV2');
  });

  test('should find by SpecType', () => {
    const spec = new SpecType('Pyramid');
    const found = repo.find(spec);
    expect(found.length).toBe(3);
    expect(found.every((shape) => shape.type === 'Pyramid')).toBe(true);
  });

  test('should find by SpecPointsArePositive', () => {
    const specAll = new SpecPointsArePositive();
    const specX = new SpecPointsArePositive('x');
    const specY = new SpecPointsArePositive('y');
    const specZ = new SpecPointsArePositive('z');

    const resultsAll = repo.find(specAll).map((s) => s.id);
    const resultsX = repo.find(specX).map((s) => s.id);
    const resultsY = repo.find(specY).map((s) => s.id);
    const resultsZ = repo.find(specZ).map((s) => s.id);

    expect(resultsAll.sort()).toEqual([
      'OV1',
      'OV3',
      'PY1',
      'PY2',
    ]);

    expect(resultsX.sort()).toEqual([
      'OV1',
      'OV2',
      'OV3',
      'PY1',
      'PY2',
    ]);

    expect(resultsY.sort()).toEqual([
      'OV1',
      'OV3',
      'PY1',
      'PY2',
    ]);

    expect(resultsZ.sort()).toEqual([
      'OV1',
      'OV2',
      'OV3',
      'PY1',
      'PY2',
      'PY3',
    ]);
  });
});

describe('Repository sort', () => {
  test('SortById', () => {
    const sorted = repo.sort(new SortById()).map((s) => s.id);
    expect(sorted).toEqual(['OV1', 'OV2', 'OV3', 'PY1', 'PY2', 'PY3']);
  });

  test('SortById desc', () => {
    const sorted = repo.sort(new SortById('desc')).map((s) => s.id);
    expect(sorted).toEqual(['PY3', 'PY2', 'PY1', 'OV3', 'OV2', 'OV1']);
  });

  test('SortByType', () => {
    const sorted = repo.sort(new SortByType()).map((s) => s.type);
    expect(sorted).toEqual(['Oval', 'Oval', 'Oval', 'Pyramid', 'Pyramid', 'Pyramid']);
  });

  test('SortByType desc', () => {
    const sorted = repo.sort(new SortByType('desc')).map((s) => s.type);
    expect(sorted).toEqual(['Pyramid', 'Pyramid', 'Pyramid', 'Oval', 'Oval', 'Oval']);
  });

  test('SortByFirstXOrY by X', () => {
    const sorted = repo
      .sort(new SortByFirstXOrY('x'))
      .map((s) => s.id);
    expect(sorted).toEqual(['PY3', 'OV1', 'OV2', 'PY1', 'PY2', 'OV3']);
  });

  test('SortByFirstXOrY by X desc', () => {
    const sorted = repo
      .sort(new SortByFirstXOrY('x', 'desc'))
      .map((s) => s.id);
    expect(sorted).toEqual(['OV3', 'PY2', 'PY1', 'OV2', 'OV1', 'PY3']);
  });

  test('SortByFirstXOrY by Y', () => {
    const sorted = repo
      .sort(new SortByFirstXOrY('y'))
      .map((s) => s.id);
    expect(sorted).toEqual(['PY3', 'OV2', 'OV1', 'PY1', 'PY2', 'OV3']);
  });

  test('SortByFirstXOrY by Y desc', () => {
    const sorted = repo
      .sort(new SortByFirstXOrY('y', 'desc'))
      .map((s) => s.id);
    expect(sorted).toEqual(['OV3', 'PY2', 'PY1', 'OV1', 'OV2', 'PY3']);
  });
});

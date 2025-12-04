import { describe, expect, test } from '@jest/globals';
import PyramidService from '../src/services/PyramidService';
import Pyramid from '../src/entities/Pyramid';
import Point from '../src/entities/Point';

describe('PyramidService', () => {
  const pyramid = new Pyramid(
    'PY1',
    new Point(0, 0, 0),
    new Point(2, 2, 0),
    new Point(1, 1, 3),
  );
  const service = new PyramidService(pyramid);

  test('should calculate volume', () => {
    const volume = service.volume();
    expect(volume).toBe(4);
  });

  test('should calculate surface area', () => {
    const area = service.surfaceArea();
    expect(area).toBe(4);
  });

  test('should check if test is a pyramid', () => {
    expect(service.isPyramid()).toEqual(true);
  });

  test('should check if base is on coordinate plane', () => {
    expect(service.isPyBaseOnCoordinatePlane()).toEqual(true);
  });
});

import { describe, expect, test } from '@jest/globals';
import OvalService from '../src/services/OvalService';
import Oval from '../src/entities/Oval';
import Point from '../src/entities/Point';

describe('OvalServices', () => {
  const oval = new Oval('OVTest', new Point(0, 0), new Point(4, 2));
  const service = new OvalService(oval);

  test('should correctly calculate area', () => {
    const area = service.area();
    expect(area).toBeCloseTo(Math.PI * 2, 0.0001);
  });

  test('should correctly calculate perimeter', () => {
    const perimeter = service.perimeter();
    expect(perimeter).toBeCloseTo(9.688);
  });

  test('should determine if test is a circle', () => {
    const circle = new Oval('OV2', new Point(0, 0), new Point(2, 2));
    const circleService = new OvalService(circle);
    expect(circleService.isCircle()).toEqual(true);
  });

  test('should determine if test is an oval', () => {
    expect(service.isOval()).toEqual(true);
  });

  test('should detect intersection with axes', () => {
    expect(service.intersectsAnyAxis()).toEqual(true);
  });
});

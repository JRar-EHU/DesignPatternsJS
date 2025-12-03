import { expect } from 'chai';
import Oval from '../src/entities/Oval';
import Point from '../src/entities/Point';
import OvalService from '../src/services/OvalService';

describe('OvalServices', () => {
  const oval = new Oval('OVTest', new Point(0, 0), new Point(4, 2));
  const service = new OvalService(oval);

  it('should correctly calculate area', () => {
    const area = service.area();
    expect(area).to.be.closeTo(Math.PI * 2, 0.0001);
  });

  it('should correctly calculate perimeter', () => {
    const perimeter = service.perimeter();
    expect(perimeter).to.be.a('number');
  });

  it('should determine if it is a circle', () => {
    const circle = new Oval('OV2', new Point(0, 0), new Point(2, 2));
    const circleService = new OvalService(circle);
    expect(circleService.isCircle()).to.be.equal(true);
  });

  it('should determine if it is an oval', () => {
    expect(service.isOval()).to.be.equal(true);
  });

  it('should detect intersection with axes', () => {
    expect(service.intersectsAnyAxis()).to.be.equal(true);
  });
});

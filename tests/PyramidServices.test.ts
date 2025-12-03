import { expect } from 'chai';
import Pyramid from '../src/entities/Pyramid';
import Point from '../src/entities/Point';
import PyramidService from '../src/services/PyramidService';

describe('PyramidService', () => {
  const pyramid = new Pyramid(
    'PY1',
    new Point(0, 0, 0),
    new Point(2, 2, 0),
    new Point(1, 1, 3),
  );
  const service = new PyramidService(pyramid);

  it('should calculate volume', () => {
    const volume = service.volume();
    expect(volume).to.be.a('number');
  });

  it('should calculate surface area', () => {
    const area = service.surfaceArea();
    expect(area).to.be.a('number');
  });

  it('should check if it is a pyramid', () => {
    expect(service.isPyramid()).to.equal(true);
  });

  it('should check if base is on coordinate plane', () => {
    expect(service.isPyBaseOnCoordinatePlane()).to.equal(true);
  });
});

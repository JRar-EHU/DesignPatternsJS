import Warehouse from '../warehouse/Warehouse';
import IObserver from './IObserver';
import Shape from '../entities/Shape';
import OvalService from '../services/OvalService';
import Oval from '../entities/Oval';
import Pyramid from '../entities/Pyramid';
import PyramidService from '../services/PyramidService';

export default class ShapeObserver implements IObserver {
  constructor(private warehouse: Warehouse) {}

  update(shape: Shape) {
    if (shape instanceof Oval) {
      const service = new OvalService(shape);
      this.warehouse.set(shape.id, 'area', service.area());
      this.warehouse.set(shape.id, 'perimeter', service.perimeter());
      this.warehouse.set(shape.id, 'isCircle', Number(service.isCircle()));
      this.warehouse.set(shape.id, 'isOval', Number(service.isOval()));
      this.warehouse.set(shape.id, 'intersectsAnyAxis', Number(service.intersectsAnyAxis()));
    }

    if (shape instanceof Pyramid) {
      const service = new PyramidService(shape);
      this.warehouse.set(shape.id, 'surfaceArea', service.surfaceArea());
      this.warehouse.set(shape.id, 'volume', service.volume());
      this.warehouse.set(shape.id, 'isPyramid', Number(service.isPyramid()));
      this.warehouse.set(shape.id, 'isPyBaseOnCoordinatePlane', Number(service.isPyBaseOnCoordinatePlane()));
    }
  }

  remove(shape: Shape) {
    this.warehouse.remove(shape.id);
  }
}

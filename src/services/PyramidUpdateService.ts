import Repository from '../repository/Repository';
import Point from '../entities/Point';
import Pyramid from '../entities/Pyramid';
import PyramidUpdateValidator from '../validation/PyramidUpdateValidator';
import logger from '../logger/Logger';

export default class PyramidUpdateService {
  constructor(
    private readonly repository: Repository,
  ) {}

  update(pyramid: Pyramid, p1: Point, p2: Point, apex: Point) {
    try {
      const validator = new PyramidUpdateValidator(p1, p2, apex);
      validator.validate();
      pyramid.setP1(p1);
      pyramid.setP2(p2);
      pyramid.setApex(apex);
      this.repository.update(pyramid);
    } catch {
      logger.error('Failed to change Pyramid');
    }
  }
}

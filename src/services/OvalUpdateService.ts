import Repository from '../repository/Repository';
import Oval from '../entities/Oval';
import Point from '../entities/Point';
import OvalUpdateValidator from '../validation/OvalUpdateValidator';
import logger from '../logger/Logger';

export default class OvalUpdateService {
  constructor(
    private readonly repository: Repository,
  ) {}

  update(oval: Oval, p1: Point, p2: Point) {
    try {
      const validator = new OvalUpdateValidator(p1, p2);
      validator.validate();
      oval.setP1(p1);
      oval.setP2(p2);
      this.repository.update(oval);
    } catch {
      logger.error('Failed to change Oval');
    }
  }
}

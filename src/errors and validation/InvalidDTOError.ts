import INewsDTO from '../adapters/INewsDTO';

export default class InvalidDTOError extends Error {
  readonly dto: INewsDTO;

  constructor(message: string, dto: INewsDTO) {
    super(message);
    this.name = 'InvalidDTOError';
    this.dto = dto;
  }
}

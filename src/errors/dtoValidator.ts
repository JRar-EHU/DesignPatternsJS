import INewsDTO from '../adapters/INewsDTO';
import InvalidDTOError from './InvalidDTOError';

export default function validateDTO(dto: INewsDTO) {
  if (!dto.type || !dto.type.trim()) {
    throw new InvalidDTOError(`Invalid type ${dto.type}`);
  }

  if (!dto.title || !dto.title.trim()) {
    throw new InvalidDTOError(`Invalid title ${dto.title}`);
  }
  if (!dto.content || !dto.content.trim()) {
    throw new InvalidDTOError(`Invalid content ${dto.content}`);
  }
  if (dto.type === 'video' && !dto.videoUrl) {
    throw new InvalidDTOError(`Invalid url ${dto.videoUrl}`);
  }
  if (dto.type === 'ads' && dto.advertiser === '') {
    throw new InvalidDTOError(`Invalid advertiser ${dto.videoUrl}`);
  }
}

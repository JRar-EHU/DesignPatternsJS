import INewsDTO from '../adapters/INewsDTO';
import InvalidDTOError from './InvalidDTOError';

// export default function validateDTO(dto: INewsDTO) {
//   if (!dto.type) {
//     throw new InvalidDTOError('InvalidDTOError: Invalid type');
//   }
//
//   if (!dto.title) {
//     throw new InvalidDTOError('InvalidDTOError: Invalid title');
//   }
//   if (!dto.content) {
//     throw new InvalidDTOError('InvalidDTOError:  Invalid content');
//   }
//   if (dto.type === 'video' && !dto.videoUrl) {
//     throw new InvalidDTOError(`InvalidDTOError: Invalid videoUrl ${dto.videoUrl}`);
//   }
//   if (dto.type === 'videoAd' || dto.type === 'textAd') {
//     if (dto.advertiser === '') throw new InvalidDTOError('InvalidDTOError: Invalid advertiser');
//   }
export default function validateDTO(dto: INewsDTO): void {
  if (!dto.type) {
    throw new InvalidDTOError('InvalidDTOError: Invalid type', dto);
  }

  if (!dto.title) {
    throw new InvalidDTOError('InvalidDTOError: No title', dto);
  }

  if (!dto.content) {
    throw new InvalidDTOError('InvalidDTOError: No content', dto);
  }

  if (!Array.isArray(dto.sources)) {
    throw new InvalidDTOError('InvalidDTOError: Invalid sources', dto);
  }

  switch (dto.type) {
    case 'text':
      return;

    case 'textAd':
      if (!dto.advertiser) {
        throw new InvalidDTOError('InvalidDTOError: No advertiser', dto);
      }
      return;

    case 'video':
      if (!dto.videoUrl) {
        throw new InvalidDTOError('InvalidDTOError: No videoUrl', dto);
      }
      return;

    case 'videoAd':
      if (!dto.videoUrl) {
        throw new InvalidDTOError('InvalidDTOError: No videoUrl', dto);
      }
      if (!dto.advertiser) {
        throw new InvalidDTOError('InvalidDTOError: No advertiser', dto);
      }
      return;

    default:
      throw new InvalidDTOError('InvalidDTOError: Unknown type', dto);
  }
}

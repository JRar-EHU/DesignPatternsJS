import IAbsNewsFactory from './IAbsNewsFactory';
import VideoNews from '../news/video/VideoNews';
import VideoAdsNews from '../news/video/VideoAdsNews';
import INewsDTO from '../adapters/INewsDTO';
import InvalidNewsDataError from '../errors/InvalidNewsDataError';

export default class VideoNewsFactory implements IAbsNewsFactory {
  createRegular(dto: INewsDTO) {
    if (!dto.videoUrl) {
      throw new InvalidNewsDataError('No video Url');
    }
    return new VideoNews(
      dto.title,
      dto.content,
      dto.sources,
      dto.videoUrl,
    );
  }

  createAds(dto: INewsDTO) {
    if (!dto.videoUrl) {
      throw new InvalidNewsDataError('No video Url');
    }

    if (!dto.advertiser) {
      throw new InvalidNewsDataError('No advertiser');
    }

    return new VideoAdsNews(
      dto.title,
      dto.content,
      dto.sources,
      dto.videoUrl,
      dto.advertiser,
    );
  }
}

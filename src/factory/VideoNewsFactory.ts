import IAbsNewsFactory from './IAbsNewsFactory';
import VideoNews from '../news/video/VideoNews';
import VideoAdsNews from '../news/video/VideoAdsNews';
import INewsDTO from '../adapters/INewsDTO';

export default class VideoNewsFactory implements IAbsNewsFactory {
  createRegular(dto: INewsDTO) {
    return new VideoNews(
      dto.title,
      dto.content,
      dto.videoUrl!,
    );
  }

  createAds(dto: INewsDTO) {
    return new VideoAdsNews(
      dto.title,
      dto.content,
      dto.videoUrl!,
      dto.advertiser!,
    );
  }
}

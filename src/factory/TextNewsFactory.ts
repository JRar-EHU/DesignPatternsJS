import IAbsNewsFactory from './IAbsNewsFactory';
import TextNews from '../news/text/TextNews';
import TextAdsNews from '../news/text/TextAdsNews';
import INewsDTO from '../adapters/INewsDTO';
import InvalidNewsDataError from '../errors/InvalidNewsDataError';

export default class TextNewsFactory implements IAbsNewsFactory {
  createRegular(dto: INewsDTO) {
    const isRumor = dto.sources.length === 0;

    return new TextNews(
      dto.title,
      dto.content,
      dto.sources,
      isRumor,
    );
  }

  createAds(dto: INewsDTO) {
    if (!dto.advertiser) {
      throw new InvalidNewsDataError('No advertiser.');
    }
    return new TextAdsNews(
      dto.title,
      dto.content,
      dto.sources,
      dto.advertiser,
    );
  }
}

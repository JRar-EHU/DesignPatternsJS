import IAbsNewsFactory from './IAbsNewsFactory';
import TextNews from '../news/text/TextNews';
import TextAdsNews from '../news/text/TextAdsNews';
import INewsDTO from '../adapters/INewsDTO';

export default class TextNewsFactory implements IAbsNewsFactory {
  createRegular(dto: INewsDTO) {
    const sources = dto.sources ? dto.sources : [];
    const isRumor = dto.sources?.length === 0;

    return new TextNews(
      dto.title,
      dto.content,
      sources,
      isRumor,
    );
  }

  createAds(dto: INewsDTO) {
    return new TextAdsNews(
      dto.title,
      dto.content,
      dto.advertiser!,
    );
  }
}

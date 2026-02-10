import INewsMapper from './INewsMapper';
import IJsonNews from '../data/IJsonNews';
import INewsDTO from './INewsDTO';

export default class JsonNewsMapper implements INewsMapper<IJsonNews> {
  private typeMap: Record<IJsonNews['kind'], INewsDTO['type']> = {
    TXT: 'text',
    VID: 'video',
    TXT_AD: 'textAd',
    VID_AD: 'videoAd',
  };

  mapToDto(data: IJsonNews): INewsDTO {
    return {
      type: this.typeMap[data.kind],
      title: data.head ?? '',
      content: data.body ?? '',
      sources: data.refs ?? [],
      videoUrl: data.vidLink,
      advertiser: data.adClient,
    };
  }
}

import INewsAdapter from './INewsAdapter';
import IJsonNews from './IJsonNews';
import INewsDTO from './INewsDTO';

export default class JsonNewsAdapter implements INewsAdapter<IJsonNews> {
  private typeMap: Record<IJsonNews['kind'], INewsDTO['type']> = {
    TXT: 'text',
    VID: 'video',
    TXT_AD: 'textAd',
    VID_AD: 'videoAd',
  };

  adapt(data: IJsonNews): INewsDTO {
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

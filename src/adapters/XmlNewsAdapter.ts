import IXmlNews from './IXmlNews';
import INewsAdapter from './INewsAdapter';
import INewsDTO from './INewsDTO';

export default class XmlNewsAdapter implements INewsAdapter<IXmlNews> {
  private typeMap: Record<string, INewsDTO['type']> = {
    Text: 'text',
    Video: 'video',
    Text_Advert: 'textAd',
    Video_Advert: 'videoAd',
  };

  adapt(data: IXmlNews): INewsDTO {
    const find = (tag: string): string | undefined => data.children
      ?.find((c) => c.tag === tag)
      ?.value;

    const sources = data.children
      ?.filter((c) => c.tag === 'insight')
      .map((c) => c.value!)
        || [];

    return {
      type: this.typeMap[find('category')!],
      title: find('headline') ?? '',
      content: find('text') ?? '',
      sources,
      videoUrl: find('mediaLink'),
      advertiser: find('sponsor'),
    };
  }
}

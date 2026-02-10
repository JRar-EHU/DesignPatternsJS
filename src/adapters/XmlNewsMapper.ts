import IXmlNews from '../data/IXmlNews';
import INewsMapper from './INewsMapper';
import INewsDTO from './INewsDTO';

export default class XmlNewsMapper implements INewsMapper<IXmlNews> {
  private typeMap: Record<string, INewsDTO['type']> = {
    Text: 'text',
    Video: 'video',
    Text_Advert: 'textAd',
    Video_Advert: 'videoAd',
  };

  mapToDto(data: IXmlNews): INewsDTO {
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

import INewsAdapter from './INewsAdapter';
import INewsDTO from './INewsDTO';
import XmlNewsMapper from './XmlNewsMapper';
import XmlClient from '../data/XmlClient';

export default class XmlNewsAdapter implements INewsAdapter {
  private adapter = new XmlNewsMapper();

  constructor(
    private client: XmlClient,
  ) {
  }

  getNews(): INewsDTO[] {
    return this.client
      .fetchFeed()
      .map((data) => this.adapter.mapToDto(data));
  }
}

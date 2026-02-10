import INewsAdapter from './INewsAdapter';
import JsonNewsMapper from './JsonNewsMapper';
import JsonClient from '../data/JsonClient';
import INewsDTO from './INewsDTO';

export default class JsonNewsAdapter implements INewsAdapter {
  private adapter = new JsonNewsMapper();

  constructor(
    private client: JsonClient,
  ) {
  }

  getNews(): INewsDTO[] {
    return this.client
      .fetchData()
      .map((data) => this.adapter.mapToDto(data));
  }
}

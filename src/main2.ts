import NewsPublisher from './observer/NewsPublisher';
import TextObserver from './observer/TextObserver';
import VideoObserver from './observer/VideoObserver';
import AdsObserver from './observer/AdsObserver';
import INewsDTO from './adapters/INewsDTO';
import JsonNewsAdapter from './adapters/JsonNewsAdapter';
import { jsonDataset, xmlDataset } from './data/data';
import XmlNewsAdapter from './adapters/XmlNewsAdapter';
import News from './news/News';
import TextNewsFactory from './factory/TextNewsFactory';
import VideoNewsFactory from './factory/VideoNewsFactory';
import validateDTO from './errors/dtoValidator';

function createPublisher() {
  const publisher = new NewsPublisher();

  const textObserver = new TextObserver();
  const videoObserver = new VideoObserver();
  const adsObserver = new AdsObserver();

  publisher.attach(textObserver);
  publisher.attach(videoObserver);
  publisher.attach(adsObserver);

  return {
    publisher,
    textObserver,
    videoObserver,
    adsObserver,
  };
}

function adaptJson(): INewsDTO[] {
  const adapter = new JsonNewsAdapter();
  return jsonDataset.map((data) => adapter.adapt(data));
}

function adaptXml(): INewsDTO[] {
  const adapter = new XmlNewsAdapter();
  return xmlDataset.map((data) => adapter.adapt(data));
}

function createNews(dtoList: INewsDTO[]): News[] {
  const textFactory = new TextNewsFactory();
  const videoFactory = new VideoNewsFactory();
  const result: News[] = [];

  for (const dto of dtoList) {
    try {
      validateDTO(dto);
      switch (dto.type) {
        case 'text':
          result.push(textFactory.createRegular(dto));
          break;
        case 'textAd':
          result.push(textFactory.createAds(dto));
          break;
        case 'video':
          result.push(videoFactory.createRegular(dto));
          break;
        case 'videoAd':
          result.push(videoFactory.createAds(dto));
          break;
        default:
          console.error('Unknown dto: ', dto.type);
      }
    } catch (e) {
      if (e instanceof Error) console.error('Invalid DTO in main:', e.message, dto);
    }
  }

  console.log(result.length);
  return result;
}

function publishAll(
  publisher: NewsPublisher,
  newsList: News[],
) {
  newsList.forEach((news) => {
    publisher.addNews(news);
  });
}

function printResult(
  textObserver: TextObserver,
  videoObserver: VideoObserver,
  adsObserver: AdsObserver,
) {
  console.log('\n------- TEXT NEWS -------\n');
  console.log(textObserver.textNews);

  console.log('\n------- VIDEO NEWS -------\n');
  console.log(videoObserver.videoNews);

  console.log('\n------- ADS -------\n');
  console.log(adsObserver.adsNews);
}

function main() {
  const {
    publisher,
    textObserver,
    videoObserver,
    adsObserver,
  } = createPublisher();

  const jsonDTO = adaptJson();
  const xmlDto = adaptXml();
  const allDto = [...jsonDTO, ...xmlDto];
  const allNews = createNews(allDto);

  publishAll(publisher, allNews);
  printResult(textObserver, videoObserver, adsObserver);
}

main();

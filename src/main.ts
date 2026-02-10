import NewsPublisher from './observer/NewsPublisher';
import TextSubscriber from './observer/TextSubscriber';
import VideoSubscriber from './observer/VideoSubscriber';
import AdsSubscriber from './observer/AdsSubscriber';
import INewsDTO from './adapters/INewsDTO';
import News from './news/News';
import TextNewsFactory from './factory/TextNewsFactory';
import VideoNewsFactory from './factory/VideoNewsFactory';
import validateDTO from './errors and validation/dtoValidator';
import JsonClient from './data/JsonClient';
import XmlClient from './data/XmlClient';
import JsonNewsAdapter from './adapters/JsonNewsAdapter';
import XmlNewsAdapter from './adapters/XmlNewsAdapter';
import JsonNewsMapper from './adapters/JsonNewsMapper';
import { jsonDataset, xmlDataset } from './data/data';
import XmlNewsMapper from './adapters/XmlNewsMapper';

function createPublisher() {
  const publisher = new NewsPublisher();

  const textObserver = new TextSubscriber();
  const videoObserver = new VideoSubscriber();
  const adsObserver = new AdsSubscriber();

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

// function adaptJson(): INewsDTO[] {
//   const adapter = new JsonNewsMapper();
//   return jsonDataset.map((data) => adapter.mapToDto(data));
// }

// function adaptXml(): INewsDTO[] {
//   const adapter = new XmlNewsMapper();
//   return xmlDataset.map((data) => adapter.mapToDto(data));
// }

function loadAllDto(): INewsDTO[] {
  const jsonProvider = new JsonNewsAdapter(
    new JsonClient(),
  );
  const xmlProvider = new XmlNewsAdapter(
    new XmlClient(),
  );
  return [
    ...jsonProvider.getNews(),
    ...xmlProvider.getNews(),
  ];
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
          console.error('Main: Unknown dto: ', dto.type);
      }
    } catch (e) {
      if (e instanceof Error) console.error('Main:', e.message, dto);
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
  textObserver: TextSubscriber,
  videoObserver: VideoSubscriber,
  adsObserver: AdsSubscriber,
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

  // const jsonDTO = adaptJson();
  // const xmlDto = adaptXml();
  // const allDto = [...jsonDTO, ...xmlDto];

  const allDto = loadAllDto();

  const allNews = createNews(allDto);

  publishAll(publisher, allNews);
  printResult(textObserver, videoObserver, adsObserver);
}

main();

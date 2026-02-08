import NewsPublisher from './observer/NewsPublisher';
import TextObserver from './observer/TextObserver';
import VideoObserver from './observer/VideoObserver';
import AdsObserver from './observer/AdsObserver';
import JsonNewsAdapter from './adapters/JsonNewsAdapter';
import XmlNewsAdapter from './adapters/XmlNewsAdapter';
import TextNewsFactory from './factory/TextNewsFactory';
import VideoNewsFactory from './factory/VideoNewsFactory';

const publisher = new NewsPublisher();

const jsonNews = {
  kind: 'T',
  head: 'Breaking News!',
  body: 'Something happened.',
  refs: ['BBC', 'CNN'],
  trusted: 1,
  adClient: 'AdCompany',
};

const xmlNews = {
  tag: 'news',
  children: [
    { tag: 'category', value: 'Video' },
    { tag: 'headline', value: 'Video Breaking!' },
    { tag: 'text', value: 'Watch this!' },
    { tag: 'ref', value: 'YouTube' },
    { tag: 'isRumor', value: 'false' },
    { tag: 'mediaLink', value: 'http://video.com/1' },
    { tag: 'sponsor', value: 'VideoAdCompany' },
  ],
};

const textObserver = new TextObserver();
const videoObserver = new VideoObserver();
const adsObserver = new AdsObserver();

publisher.attach(textObserver);
publisher.attach(videoObserver);
publisher.attach(adsObserver);

const jsonAdapter = new JsonNewsAdapter();
const xmlAdapter = new XmlNewsAdapter();
const jsonDTO = jsonAdapter.adapt(jsonNews);
const xmlDTO = xmlAdapter.adapt(xmlNews);

const textFactory = new TextNewsFactory();
const videoFactory = new VideoNewsFactory();

const textAdsNews = textFactory.createAds(jsonDTO);
const textNews = textFactory.createRegular(jsonDTO);

const videoNews = videoFactory.createRegular(xmlDTO);
const videoAdsNews = videoFactory.createAds(xmlDTO);

publisher.addNews(textNews);
publisher.addNews(videoNews);
publisher.addNews(textAdsNews);
publisher.addNews(videoAdsNews);

console.log('------------All news in publisher------------');
console.log(publisher.newsList);

console.log('------------test observer------------');
console.log('------------text observer------------');
console.log('TextNews:', textObserver.textNews);
console.log('------------ads observer------------');
console.log('AdsNews:', adsObserver.adsNews);
console.log('------------video observer------------');
console.log('VideoNews:', videoObserver.videoNews);

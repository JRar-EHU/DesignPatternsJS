export default interface INewsDTO {
  type: 'text' | 'video' | 'textAd' | 'videoAd';
  title: string;
  content: string;
  sources?: string[];
  videoUrl?: string;
  advertiser?: string;
}

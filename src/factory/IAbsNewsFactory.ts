import News from '../news/News';
import INewsDTO from '../adapters/INewsDTO';

export default interface IAbsNewsFactory {
  createRegular(dto: INewsDTO): News;
  createAds(dto: INewsDTO): News;
}

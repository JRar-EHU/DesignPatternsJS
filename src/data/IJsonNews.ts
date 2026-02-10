export default interface IJsonNews {
  kind: string;
  head: string;
  body: string;
  refs?: string[];
  vidLink?: string;
  adClient?: string;
}

import Point from './Point';

export default abstract class Shape {
  public id: string;

  public abstract type: string;

  public abstract points: Point[];

  protected constructor(id: string) {
    this.id = id;
  }
}

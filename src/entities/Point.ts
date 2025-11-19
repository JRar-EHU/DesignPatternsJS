export default class Point {
  public x: number;

  public y: number;

  public z = 0;

  constructor(x: number, y: number, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString(): string {
    return `${this.x},${this.y},${this.z}`;
  }
}

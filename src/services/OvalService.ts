/* eslint-disable */
import { Shape } from './Shape';
import { Point } from './Point';

export class Oval extends Shape {
  constructor(
    id: string,
    public readonly p1: Point,
    public readonly p2: Point,
  ) {
    super(id, 'Oval');
  }
}

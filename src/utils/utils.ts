import fs from 'node:fs';
import path from 'node:path';
import { LINE_SPLIT, NUMBER_IS_CORRECT, SPACE } from '../data/constants';
import Point from '../entities/Point';
import logger from '../logger/Logger';
import InvalidDataError from '../errors/InvalidDataError';

export function readLines(relativePath: string): string[] {
  const filePath = path.resolve(relativePath);

  return fs.readFileSync(filePath, 'utf-8')
    .split(LINE_SPLIT)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseNumbers(line: string): { id: string; nums: number[] } {
  const parts = line.trim().split(SPACE);
  const id = parts[0];
  const nums = parts.slice(1).map(Number);
  return { id, nums };
}

export function triangleArea(a: Point, b: Point, c: Point): number {
  return (
    Math.abs(
      a.x * (b.y - c.y)
          + b.x * (c.y - a.y)
          + c.x * (a.y - b.y),
    ) / 2
  );
}

export function rectangleArea(a: Point, b: Point): number {
  const width = Math.abs(b.x - a.x);
  const height = Math.abs(b.y - a.y);
  return width * height;
}

// export function areCollinear2D(a: Point, b: Point, c: Point): boolean {
//   return (
//     a.x * (b.y - c.y)
//       + b.x * (c.y - a.y)
//       + c.x * (a.y - b.y)
//   ) === 0;
// }

export function areCollinear3D(a: Point, b: Point, c: Point): boolean {
  const v1 = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
  const v2 = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
  const cross = {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
  return cross.x === 0 && cross.y === 0 && cross.z === 0;
}

export function checkNumbers(values: string[]): void {
  values.forEach((num) => {
    if (!NUMBER_IS_CORRECT.test(num)) {
      logger.error(`Invalid number: ${num}`);
      throw new InvalidDataError(`Invalid number: ${num}`);
    }
  });
}

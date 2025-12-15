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

// export function triangleArea(a: Point, b: Point, c: Point): number {
//   return (
//     Math.abs(
//       a.x * (b.y - c.y)
//           + b.x * (c.y - a.y)
//           + c.x * (a.y - b.y),
//     ) / 2
//   );
// }

// export function rectangleArea(a: Point, b: Point): number {
//   const width = Math.abs(b.x - a.x);
//   const height = Math.abs(b.y - a.y);
//   return width * height;
// }

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

// export function triangleArea3D(a: Point, b: Point, c: Point): number {
//   const ab = {
//     x: b.x - a.x,
//     y: b.y - a.y,
//     z: b.z - a.z,
//   };
//
//   const ac = {
//     x: c.x - a.x,
//     y: c.y - a.y,
//     z: c.z - a.z,
//   };
//
//   const cross = {
//     x: ab.y * ac.z - ab.z * ac.y,
//     y: ab.z * ac.x - ab.x * ac.z,
//     z: ab.x * ac.y - ab.y * ac.x,
//   };
//
//   const magnitude = Math.sqrt(
//     cross.x ** 2 + cross.y ** 2 + cross.z ** 2,
//   );
//
//   return magnitude / 2;
// }

export function checkNumbers(values: string[]): void {
  values.forEach((num) => {
    if (!NUMBER_IS_CORRECT.test(num)) {
      logger.error(`Invalid number: ${num}`);
      throw new InvalidDataError(`Invalid number: ${num}`);
    }
  });
}

export function rectangleArea3D(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;

  // Площадь прямоугольника в 3D через длину проекций на оси
  const sideX = Math.sqrt(dx ** 2 + dz ** 2); // проекция на XZ
  const sideY = Math.sqrt(dy ** 2 + dz ** 2); // проекция на YZ

  return sideX * sideY;
}

export function triangleArea3D(a: Point, b: Point, apex: Point): number {
  const ab = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
  const ac = Math.sqrt((apex.x - a.x) ** 2 + (apex.y - a.y) ** 2 + (apex.z - a.z) ** 2);
  const bc = Math.sqrt((apex.x - b.x) ** 2 + (apex.y - b.y) ** 2 + (apex.z - b.z) ** 2);

  const s = (ab + ac + bc) / 2;
  return Math.sqrt(s * (s - ab) * (s - ac) * (s - bc));
}

import fs from 'node:fs';
import path from 'node:path';
import { LINE_SPLIT, NUMBER_IS_CORRECT, SPACE } from '../data/constants';
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

export function checkNumbers(values: string[]): void {
  values.forEach((num) => {
    if (!NUMBER_IS_CORRECT.test(num)) {
      logger.error(`Invalid number: ${num}`);
      throw new InvalidDataError(`Invalid number: ${num}`);
    }
  });
}

import fs from 'node:fs';
import path from 'node:path';
import { LINE_SPLIT } from '../data/constants';

export default function readLines(relativePath: string): string[] {
  const filePath = path.resolve(relativePath);

  return fs.readFileSync(filePath, 'utf-8')
    .split(LINE_SPLIT)
    .map((line) => line.trim())
    .filter(Boolean);
}

import pino from 'pino';
import fs from 'node:fs';
import path from 'node:path';
import { DATE_ISO_FORMAT, DATE_ISO_FORMAT_REPLACE } from '../data/constants';

const projectRoot = path.resolve(__dirname, '../../');
const logDir = path.join(projectRoot, 'src/logger/logs');

const timestamp = new Date()
  .toISOString()
  .replace(DATE_ISO_FORMAT, DATE_ISO_FORMAT_REPLACE);

const logFile = path.join(logDir, `logs_${timestamp}.txt`);
const fileStream = fs.createWriteStream(logFile, { flags: 'a' });

const prettyStream = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:standard',
  },
});

const logger = pino(
  {},
  pino.multistream([
    { stream: prettyStream },
    { stream: fileStream },
  ]),
);

export default logger;

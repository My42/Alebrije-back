import {
  createLogger, transports, Logger, format,
} from 'winston';

const logger: Logger = createLogger({
  level: 'info',
  transports: [
    new (transports.Console)({
      level: 'info',
    })],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.simple(),
    format.colorize({ all: true }),
  ),
});

export default logger;

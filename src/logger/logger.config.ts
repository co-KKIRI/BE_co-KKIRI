import { createLogger } from 'winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import { WinstonModule } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';

const isProduction = process.env['NODE_ENV'] === 'production';

const productionFormat = winston.format.simple();

const developmentFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('co-KKIRI', {
    colors: true,
    prettyPrint: true,
  }),
);

const logDir = __dirname + '/../../logs';
const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  };
};

const winstonLogger = WinstonModule.createLogger({
  instance: createLogger({
    transports: [
      new winston.transports.Console({
        format: isProduction ? productionFormat : developmentFormat,
      }),
      new winstonDaily(dailyOptions('info')),
      new winstonDaily(dailyOptions('warn')),
      new winstonDaily(dailyOptions('error')),
    ],
  }),
});

export { winstonLogger };

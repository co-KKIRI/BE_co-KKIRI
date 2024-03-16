import { createLogger } from 'winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

const getLoggerInstance = () =>
  createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('co-KKIRI', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });

export { getLoggerInstance };

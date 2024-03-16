import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerContextMiddleware } from '../middleware/logger-context.middleware';
import { WinstonModule } from 'nest-winston';
import { ClsModule, ClsService } from 'nestjs-cls';
import { winstonLoggerTransport } from '../logger/logger.config';
import { v4 as uuidv4 } from 'uuid';

const services = [Logger];

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['X-Request-Id'] ?? uuidv4(),
      },
    }),
    WinstonModule.forRootAsync({
      inject: [ClsService],
      useFactory: (clsService: ClsService) => {
        return {
          transports: [winstonLoggerTransport(clsService)],
        };
      },
    }),
  ],
  providers: services,
  exports: services,
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}

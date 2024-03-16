import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { getLoggerInstance } from './logger/logger.config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: getLoggerInstance() }),
  });

  app.enableCors({
    origin: ['http://localhost', 'http://127.0.0.1'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('co-KKIRI')
    .setDescription('co-KKIRI API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(8080);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  const redisClient = createClient({
    socket: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    },
    password: configService.get('REDIS_PASSWORD'),
  });
  redisClient
    .connect()
    .then(() => console.log('redis connect'))
    .catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'co-kkiri:',
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.use(
    session({
      name: configService.get('COOKIE_NAME'),
      secret: configService.get('COOKIE_SECRET'),
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        domain: 'localhost',
        path: '/',
        httpOnly: false,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: ['http://localhost', 'http://127.0.0.1'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다.
      transform: true, // request와 일치하는 class로 변환, 이 처리를 안하면 그냥 object로 넘어옴
    }),
  );

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

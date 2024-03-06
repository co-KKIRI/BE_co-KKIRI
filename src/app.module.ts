import { Test } from './test/entities/test.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '.env.dev'
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'co-kkiri.cvgmeiuqivj8.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: 'qwer1234',
      database: 'cokkiri',
      entities: [Test],
      synchronize: false,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

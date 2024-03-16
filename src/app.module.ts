import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import { TypeORMConfigService } from 'src/database.config';
import { CommentModule } from './comment/comment.module';
import { MemberModule } from './member/member.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeORMConfigService,
    }),
    TestModule,
    CommentModule,
    MemberModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

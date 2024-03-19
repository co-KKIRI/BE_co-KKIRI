import { Logger, Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import { TypeORMConfigService } from 'src/database/database.config';
import { CommentService } from './service/comment.service';
import { MemberService } from './service/member.service';
import { CommentController } from './controller/comment.controller';
import { MemberController } from './controller/member.controller';
import { Post } from './entity/post.entity';
import { CommonModule } from './common/common.module';
import { StudyManagementController } from './controller/study-management.controller';
import { StudyManagementService } from './service/study-management.service';
import { TeamMemberQueryRepository } from './repository/team-member.query-repository';
import { TeamMember } from './entity/team-member.entity';
import { StudyTeamMemberController } from './controller/study-team-member.controller';
import { StudyTeamMemberService } from './service/study-team-member.service';
import { PostListController } from './controller/post-list.controller';
import { PostListService } from './service/post-list.service';
import { PostListQueryRepository } from './repository/post-list.query-repository';
import { Member } from './entity/member.entity';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeORMConfigService,
    }),
    TypeOrmModule.forFeature([Post, TeamMember, Member]),
    TestModule,
  ],
  controllers: [
    AppController,
    CommentController,
    PostListController,
    MemberController,
    StudyManagementController,
    StudyTeamMemberController,
  ],
  providers: [
    Logger,
    AppService,
    CommentService,
    MemberService,
    StudyManagementService,
    TeamMemberQueryRepository,
    StudyTeamMemberService,
    PostListService,
    PostListQueryRepository,
  ],
})
export class AppModule {}

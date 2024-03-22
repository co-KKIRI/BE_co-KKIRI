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
import { Member } from './entity/member.entity';
import { PostView } from './entity/post-view.entity';
import { Comment } from './entity/comment.entity';
import { PostScrap } from './entity/post-scrap.entity';

import { CommonModule } from './common/common.module';
import { PostManagementController } from './controller/post-management.controller';
import { PostManagementService } from './service/post-management.service';
import { TeamMemberQueryRepository } from './repository/team-member.query-repository';
import { TeamMember } from './entity/team-member.entity';
import { PostTeamMemberController } from './controller/post-team-member.controller';
import { PostTeamMemberService } from './service/post-team-member.service';

import { PassportModule } from '@nestjs/passport';
import { SessionSerializerService } from './service/session-serializer.service';
import { GoogleAuthenticationService } from './service/google-authentication.service';
import { GoogleAuthenticationController } from './controller/google-auth.controller';
import { GoogleStrategy } from './strategy/google-strategy';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { PostListController } from './controller/post-list.controller';
import { PostListService } from './service/post-list.service';
import { PostListQueryRepository } from './repository/post-list.query-repository';
import { PostDetailController } from './controller/post-detail.controller';
import { PostDetailService } from './service/post-detail.service';
import { PostDetailQueryRepository } from './repository/post-detail.query-repository';
import { RolesGuard } from './guard/roles.guard';



@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeORMConfigService,
    }),
    TypeOrmModule.forFeature([Post, TeamMember, Member, PostView, Comment, PostScrap]),
    TestModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [
    AppController,
    CommentController,
    PostListController,
    MemberController,
    GoogleAuthenticationController,
    PostManagementController,
    PostTeamMemberController,
    PostDetailController,
  ],
  providers: [
    Logger,
    AppService,
    CommentService,
    PostListService,
    PostListQueryRepository,
    MemberService,
    PostManagementService,
    TeamMemberQueryRepository,
    GoogleAuthenticationService,
    SessionSerializerService,
    GoogleStrategy,
    GoogleAuthGuard,
    RolesGuard,
    PostTeamMemberService,
    PostDetailService,
    PostDetailQueryRepository,
  ],
})
export class AppModule { }

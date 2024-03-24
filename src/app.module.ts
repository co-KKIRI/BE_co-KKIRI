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
import { RolesGuard } from './guard/roles.guard';
import { MemberQueryRepository } from './repository/member.query-repository';
import { MyPageService } from './service/my-page.service';
import { MyPageController } from './controller/my-page.controller';
import { MyPageQueryRepository } from './repository/my-page.query-repository';
import { PostDetailController } from './controller/post-detail.controller';
import { PostDetailService } from './service/post-detail.service';
import { PostDetailQueryRepository } from './repository/post-detail.query-repository';
import { PostScrap } from './entity/post-scrap.entity';
import { ImageController } from './controller/image.controller';
import { ImageService } from './service/image.service';
import { TeamInvite } from './entity/team-invite.entity';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeORMConfigService,
    }),
    TypeOrmModule.forFeature([Post, TeamMember, Member, PostView, Comment, PostScrap, TeamInvite]),
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
    MyPageController,
    ImageController,
  ],
  providers: [
    // Service
    AppService,
    CommentService,
    PostListService,
    MemberService,
    PostManagementService,
    GoogleAuthenticationService,
    SessionSerializerService,
    PostTeamMemberService,
    MyPageService,
    PostDetailService,
    ImageService,

    // QueryRepository
    PostListQueryRepository,
    TeamMemberQueryRepository,
    MemberQueryRepository,
    MyPageQueryRepository,
    PostDetailQueryRepository,

    // Strategy
    GoogleStrategy,

    // Guard
    GoogleAuthGuard,
    RolesGuard,

    // ETC
    Logger,
  ],
})
export class AppModule {}

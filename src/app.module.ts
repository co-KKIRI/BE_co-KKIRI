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
import { TeamService } from './service/team.service';
import { TeamController } from './controller/team.controller';
import { TeamInviteQueryRepository } from './repository/team-invite.query-repository';
import { MemberSearchService } from './service/member-search.service';
import { MemberSearchQueryRepository } from './repository/member-search.query-repository';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { ScoutController } from './controller/scout.controller';
import { ScoutService } from './service/scout.service';
import { ScoutQueryRepository } from './repository/scout.query-repository';
import { MyPostController } from './controller/my-post-controller';
import { GithubAuthenticationController } from './controller/github-auth.controller';
import { GithubAuthenticationService } from './service/github-authentication.service';
import { GithubAuthGuard } from './guard/github-auth.guard';
import { GithubStrategy } from './strategy/github-strategy';
import { KakaoAuthenticationController } from './controller/kakao-auth.controller';
import { KakaoAuthenticationService } from './service/kakao-authentication.service';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';
import { KakaoStrategy } from './strategy/kakao-strategy';
import { PostReview } from './entity/post-review.entity';
import { MemberReview } from './entity/member-review.entity';
import { MemberReviewComment } from './entity/member-review-comment-entity';
import { ReviewController } from './controller/review.controller';
import { ReviewService } from './service/review.service';
import { reviewQueryRepository } from './repository/review.query-repository';
import { PostCountQueryRepository } from './repository/post-count.query-repository';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeORMConfigService,
    }),
    TypeOrmModule.forFeature([
      Post,
      TeamMember,
      Member,
      PostView,
      Comment,
      PostScrap,
      TeamInvite,
      PostReview,
      MemberReview,
      MemberReviewComment,
    ]),
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
    GithubAuthenticationController,
    KakaoAuthenticationController,
    PostManagementController,
    PostTeamMemberController,
    PostDetailController,
    MyPageController,
    ImageController,
    TeamController,
    PostController,
    ScoutController,
    MyPostController,
    ReviewController,
  ],
  providers: [
    // Service
    AppService,
    CommentService,
    PostListService,
    MemberService,
    PostManagementService,
    GoogleAuthenticationService,
    GithubAuthenticationService,
    KakaoAuthenticationService,
    SessionSerializerService,
    PostTeamMemberService,
    MyPageService,
    PostDetailService,
    ImageService,
    TeamService,
    MemberSearchService,
    PostService,
    ScoutService,
    ReviewService,

    // QueryRepository
    PostListQueryRepository,
    TeamMemberQueryRepository,
    MemberQueryRepository,
    MyPageQueryRepository,
    PostDetailQueryRepository,
    TeamInviteQueryRepository,
    MemberSearchQueryRepository,
    ScoutQueryRepository,
    reviewQueryRepository,
    PostCountQueryRepository,

    // Strategy
    GoogleStrategy,
    GithubStrategy,
    KakaoStrategy,

    // Guard
    GoogleAuthGuard,
    GithubAuthGuard,
    KakaoAuthGuard,
    RolesGuard,

    // ETC
    Logger,
  ],
})
export class AppModule {}

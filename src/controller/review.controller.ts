import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/roles/roles.decorator';
import { PostReviewRequest } from 'src/dto/request/review/post-review.requset';
import { GetMyPageReviewResponse } from 'src/dto/response/my-page/get-my-page-review.response';
import { GetReviewMemberResponse } from 'src/dto/response/review/get-review-member.response';
import { GetReviewResponse } from 'src/dto/response/review/get-review-response';
import { RolesGuard } from 'src/guard/roles.guard';
import { MyPageService } from 'src/service/my-page.service';
import { ReviewService } from 'src/service/review.service';

@ApiTags('Review')
@Controller('review')
@UseGuards(RolesGuard)
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly mypageService: MyPageService,
  ) {}

  @ApiOperation({ summary: '리뷰 추가' })
  @Post('/create')
  async postReview(@Req() req, @Body() reviewContent: PostReviewRequest) {
    return this.reviewService.postReview(req.user.id, reviewContent);
  }

  @ApiOperation({ summary: '리뷰 팀 멤버 조회' })
  @Get('/:postId/member')
  async getReviewMember(@Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<GetReviewMemberResponse[]> {
    return await this.reviewService.getReviewMember(postId, req.user.id);
  }

  @ApiOperation({ summary: '리뷰 조회' })
  @Get('/:postId')
  async getReview(@Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<GetReviewResponse> {
    const reviews = await this.reviewService.getReview(postId, req.user.id);
    return GetReviewResponse.from(
      reviews.postTitle,
      reviews.postReviews,
      reviews.memberReviews,
      reviews.memberReviewComments,
    );
  }

  @ApiOperation({ summary: '유저가 받은 리뷰 목록' })
  @Get('/list/:memberId')
  async getReviewList(@Param('memberId', ParseIntPipe) memberId: number): Promise<GetMyPageReviewResponse[]> {
    return this.mypageService.getMyPageReviewList(memberId);
  }
}

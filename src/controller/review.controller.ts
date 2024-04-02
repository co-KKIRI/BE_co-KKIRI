import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/roles/roles.decorator';
import { PostReviewRequest } from 'src/dto/request/review/post-review.requset';
import { GetReviewMemberResponse } from 'src/dto/response/review/get-review-member.response';
import { GetReviewResponse } from 'src/dto/response/review/get-review-response';
import { RolesGuard } from 'src/guard/roles.guard';
import { ReviewService } from 'src/service/review.service';

@ApiTags('Review')
@Controller('review')
@UseGuards(RolesGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @ApiOperation({ summary: '리뷰 추가' })
  @Post('/create')
  async postReview(@Req() req, @Body('reviewContent') reviewContent: PostReviewRequest) {
    return this.reviewService.postReview(req.user.id, reviewContent);
  }

  @ApiOperation({ summary: '리뷰 팀 멤버 조회' })
  @Get('/:postId')
  async getReviewMember(@Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<GetReviewMemberResponse[]> {
    return await this.reviewService.getReviewMember(postId, req.user.id);
  }

  @ApiOperation({ summary: '리뷰 조회' })
  @Get('/:postId/post')
  async getReview(@Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<GetReviewResponse> {
    const reviews = await this.reviewService.getReview(postId, req.user.id);
    return GetReviewResponse.from(
      reviews.postTitle,
      reviews.postReviews,
      reviews.memberReviews,
      reviews.memberReviewComments
    )
  }
}

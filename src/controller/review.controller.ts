import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostReviewRequest } from 'src/dto/request/review/post-review.requset';
import { GetReviewMemberResponse } from 'src/dto/response/review/get-review-member.response';
import { RolesGuard } from 'src/guard/roles.guard';
import { ReviewService } from 'src/service/review.service';

@ApiTags('Review')
@Controller('review')
@UseGuards(RolesGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '리뷰 추가' })
  @Post('/create')
  async postReview(@Req() req, @Body('reviewContent') reviewContent: PostReviewRequest) {
    return this.reviewService.postReview(req.user.id, reviewContent);
  }

  @ApiOperation({ summary: '리뷰 추가' })
  @Get('/:postId')
  async getReviewMember(@Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<GetReviewMemberResponse[]> {
    return await this.reviewService.getReviewMember(postId, req.user.id);
  }
}

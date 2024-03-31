import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostReviewRequest } from 'src/dto/request/review/post-review.requset';
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
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostReviewRequest } from 'src/dto/request/review/post-review.requset';
import { MemberReviewComment } from 'src/entity/member-review-comment-entity';
import { MemberReview } from 'src/entity/member-review.entity';
import { PostReview } from 'src/entity/post-review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(PostReview) private readonly postReviewRepository: Repository<PostReview>,
    @InjectRepository(MemberReview) private readonly memberReviewRepository: Repository<MemberReview>,
    @InjectRepository(MemberReviewComment)
    private readonly memberReviewCommentRepository: Repository<MemberReviewComment>,
  ) {}

  async postReview(reviewerId: number, reviewContent: PostReviewRequest) {
    const postReviewList = reviewContent.postReview.map((r) => {
      const postReview = new PostReview();

      postReview.memberId = reviewerId;
      postReview.postId = reviewContent.postId;
      postReview.type = r.type;
      postReview.content = r.content;

      return postReview;
    });

    await this.postReviewRepository.save(postReviewList);

    const memberReviewList = reviewContent.memberReview.map((r) => {
      const memberReview = new MemberReview();

      memberReview.postId = reviewContent.postId;
      memberReview.reviewerMemberId = reviewerId;
      memberReview.revieweeMemberId = r.revieweeMemberId;
      memberReview.type = r.type;
      memberReview.content = r.content;

      return memberReview;
    });

    await this.memberReviewRepository.save(memberReviewList);

    const memberReviewCommentList = reviewContent.memberReviewComment.map((r) => {
      const memberReviewComment = new MemberReviewComment();

      memberReviewComment.postId = reviewContent.postId;
      memberReviewComment.reviewerMemberId = reviewerId;
      memberReviewComment.revieweeMemberId = r.revieweeMemberId;
      memberReviewComment.content = r.content;

      return memberReviewComment;
    });

    await this.memberReviewCommentRepository.save(memberReviewCommentList);
  }
}
import { ApiProperty } from "@nestjs/swagger";
import { GetReviewList } from "src/dto/get-review.dto";
import { GetReviewCommentList } from "src/dto/get-review-comment.request";
import { ReviewType } from "src/entity/common/Enums";

export class PostReviews {
  @ApiProperty()
  type: ReviewType;
  @ApiProperty()
  content: string;
  constructor(type: ReviewType, content: string) {
    this.type = type;
    this.content = content;
  }
}

export class MemberReviewComments {
  @ApiProperty()
  comment: string;
  constructor(comment: string) {
    this.comment = comment;
  }
}

export class GetReviewResponse {
  @ApiProperty()
  postTitle: string;
  @ApiProperty({ type: PostReviews })
  postReviews: PostReviews[];
  @ApiProperty({ type: PostReviews })
  memberReviews: PostReviews[];
  @ApiProperty({ type: MemberReviewComments })
  memberReviewComments: MemberReviewComments[];

  constructor(
    postTitle: string,
    postReviews: PostReviews[],
    memberReviews: PostReviews[],
    memberReviewComments: MemberReviewComments[],
  ) {
    this.postTitle = postTitle;
    this.postReviews = postReviews;
    this.memberReviews = memberReviews;
    this.memberReviewComments = memberReviewComments;
  }

  static from(
    postTitle: string,
    postReview: GetReviewList[],
    memberReview: GetReviewList[],
    memberReviewComment: GetReviewCommentList[],
  ) {
    return new GetReviewResponse(
      postTitle,
      postReview.map(review =>
        new PostReviews(
          review.type,
          review.content,
        )),
      memberReview.map(review =>
        new PostReviews(
          review.type,
          review.content,
        )),
      memberReviewComment.map(review =>
        new MemberReviewComments(
          review.comment,
        ))
    )
  }
}
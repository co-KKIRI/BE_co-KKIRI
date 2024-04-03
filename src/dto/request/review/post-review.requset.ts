import { IsArray, IsInt } from 'class-validator';
import { ReviewType } from 'src/entity/common/Enums';

export class PostReviewRequest {
  @IsInt()
  postId: number;

  @IsArray()
  postReview: PostReviewType[];

  @IsArray()
  memberReview: MemberReviewType[];

  @IsArray()
  memberReviewComment: MemberReviewCommentType[];

  constructor(
    postId: number,
    postReview: PostReviewType[],
    memberReview: MemberReviewType[],
    memberReviewComment: MemberReviewCommentType[],
  ) {
    this.postId = postId;
    this.postReview = postReview;
    this.memberReview = memberReview;
    this.memberReviewComment = memberReviewComment;
  }
}

export type PostReviewType = {
  type: ReviewType;
  content: string;
};

export type MemberReviewType = {
  revieweeMemberId: number;
  type: ReviewType;
  content: string;
};

export type MemberReviewCommentType = {
  revieweeMemberId: number;
  comment: string;
};

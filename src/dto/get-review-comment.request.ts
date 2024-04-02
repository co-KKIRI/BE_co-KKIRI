import { MemberReviewCommentTuple } from "src/repository/review.query-repository";

export class GetReviewCommentDto {
  reviewInfo!: GetReviewCommentList[]
  constructor(reviewInfo: GetReviewCommentList[]) {
    this.reviewInfo = reviewInfo;
  }
}


export class GetReviewCommentList {
  comment: string;
  constructor(comment: string) { this.comment = comment; }

  static reviewCommentFrom(tuple: MemberReviewCommentTuple) {
    return new GetReviewCommentList(
      tuple.comment
    )
  }
}
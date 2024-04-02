import { ReviewType } from "src/entity/common/Enums";
import { PostReviewTuple } from "src/repository/review.query-repository";

export class GetReviewDto {
  reviewInfo!: GetReviewList[]
  constructor(reviewInfo: GetReviewList[]) {
    this.reviewInfo = reviewInfo;
  }
}

export class GetReviewList {
  type: ReviewType;
  content: string;
  constructor(type: ReviewType, content: string) {
    this.type = type;
    this.content = content;
  }

  static reviewFrom(tuple: PostReviewTuple) {
    return new GetReviewList(
      tuple.type,
      tuple.content,
    )
  }
}

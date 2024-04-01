import { ReviewType } from 'src/entity/common/Enums';
import { GetMyPageReviewTuple } from 'src/repository/my-page.query-repository';

export class GetMyPageReviewResponse {
  type: ReviewType;
  content: string;
  count: number;

  constructor(type: ReviewType, content: string, count: number) {
    this.type = type;
    this.content = content;
    this.count = count;
  }

  static from(tuple: GetMyPageReviewTuple) {
    return new GetMyPageReviewResponse(tuple.type, tuple.content, tuple.count);
  }
}

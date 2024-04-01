import { MemberReview } from '../entity/member-review.entity';
import { ReviewType } from '../entity/common/Enums';

export class ReviewScoreCalculator {
  private memberReviewList: MemberReview[];

  constructor(memberReviewList: MemberReview[]) {
    this.memberReviewList = memberReviewList;
  }

  calculateMyScore(memberId: number): number {
    const receivedReviews = this.memberReviewList.filter((memberReview) => memberReview.revieweeMemberId === memberId);
    if (receivedReviews.length === 0) {
      return 0;
    }

    const baseScore = receivedReviews
      .map((receivedReview) => {
        if (receivedReview.type == ReviewType.COMPLIMENT) {
          return 2;
        } else {
          return -1;
        }
      })
      .reduce((acc, cur) => acc + cur, 0);

    const newEvaluation = baseScore / receivedReviews.length;
    const weight = 10 / receivedReviews.length;
    return Math.sqrt(weight * newEvaluation) * 3;
  }
}

import { MemberReview } from '../entity/member-review.entity';
import { ReviewType } from '../entity/common/Enums';

export class ReviewScoreCalculator {
  private memberReviewList: MemberReview[] = [];
  private reviewerMemberCount: number = 0;

  constructor(memberReviewList: MemberReview[]) {
    this.memberReviewList = memberReviewList;
    this.countMember();
  }

  private countMember() {
    const reviewerMemberIdSet = new Set(this.memberReviewList.map((review) => review.reviewerMemberId));
    this.reviewerMemberCount = reviewerMemberIdSet.size;
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

    const newEvaluation = Math.max(0, baseScore) / this.reviewerMemberCount;
    const weight = 10 / this.reviewerMemberCount;
    return parseFloat((Math.sqrt(weight * newEvaluation) * 3).toFixed(1));
  }
}

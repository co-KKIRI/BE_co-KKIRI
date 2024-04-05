import { ReviewScoreCalculator } from './review-score.calculator';
import { MemberReview } from '../entity/member-review.entity';
import { ReviewType } from '../entity/common/Enums';

describe('ReviewScoreCalculator', () => {
  const myMemberId = 1;

  it('긍정 리뷰에 대한 점수를 계산한다.', () => {
    // Given
    const memberReviewList = [
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
    ];

    // When
    const reviewScoreCalculator = new ReviewScoreCalculator(memberReviewList, 0);
    const score = reviewScoreCalculator.calculateMyScore(myMemberId);

    // Then
    expect(score).toBe(26.8);
  });

  it('긍정 리뷰에 대한 점수를 계산한다. 완료 스터디가 여러개인 경우', () => {
    // Given
    const memberReviewList = [
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
      createMemberReview(1, 2, myMemberId, ReviewType.COMPLIMENT),
    ];

    // When
    const reviewScoreCalculator = new ReviewScoreCalculator(memberReviewList, 1);
    const score = reviewScoreCalculator.calculateMyScore(myMemberId);

    // Then
    expect(score).toBe(19);
  });

  it('리뷰가 없는 경우에 대한 점수를 계산한다.', () => {
    // Given
    const memberReviewList = [];

    // When
    const reviewScoreCalculator = new ReviewScoreCalculator(memberReviewList, 1);
    const score = reviewScoreCalculator.calculateMyScore(myMemberId);

    // Then
    expect(score).toBe(0);
  });

  it('부정 리뷰가 많은 경우 점수는 음수로 나온다.', () => {
    // Given
    const memberReviewList = [createMemberReview(1, 2, myMemberId, ReviewType.IMPROVEMENT)];

    // When
    const reviewScoreCalculator = new ReviewScoreCalculator(memberReviewList, 0);
    const score = reviewScoreCalculator.calculateMyScore(myMemberId);

    // Then
    expect(score).toBe(-9.5);
  });
});

const createMemberReview = (postId: number, reviewerMemberId: number, revieweeMemberId: number, type: ReviewType) => {
  const memberReview = new MemberReview();
  memberReview.postId = postId;
  memberReview.reviewerMemberId = reviewerMemberId;
  memberReview.revieweeMemberId = revieweeMemberId;
  memberReview.type = type;
  memberReview.createdAt = new Date();
  memberReview.updatedAt = new Date();
  return memberReview;
};

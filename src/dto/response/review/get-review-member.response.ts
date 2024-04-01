import { GetReviewMemberTuple } from 'src/repository/team-member.query-repository';

export class GetReviewMemberResponse {
  memberId: number;
  profileImageUrl?: string;
  nickname?: string;

  constructor(memberId: number, profileImageUrl?: string, nickname?: string) {
    this.memberId = memberId;
    this.profileImageUrl = profileImageUrl;
    this.nickname = nickname;
  }

  static from(tuple: GetReviewMemberTuple) {
    return new GetReviewMemberResponse(tuple.memberId, tuple.profileImageUrl, tuple.nickname);
  }
}

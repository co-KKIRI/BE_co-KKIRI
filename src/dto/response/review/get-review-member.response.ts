import { GetReviewMemberTuple } from 'src/repository/team-member.query-repository';

export class GetReviewMemberResponse {
  memberId: number;
  profileImageUrl?: string;
  nickname?: string;
  position?: string;

  constructor(memberId: number, profileImageUrl?: string, nickname?: string, position?: string) {
    this.memberId = memberId;
    this.profileImageUrl = profileImageUrl;
    this.nickname = nickname;
    this.position = position;
  }

  static from(tuple: GetReviewMemberTuple) {
    return new GetReviewMemberResponse(tuple.memberId, tuple.profileImageUrl, tuple.nickname, tuple.position);
  }
}

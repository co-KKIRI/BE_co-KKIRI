import { GetAllTeamMembersTuple } from '../repository/team-member.query-repository';
import { Member } from '../entity/member.entity';

export class GetPostTeamMember {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  position?: string;
  profileImageUrl?: string;
  isLeader!: boolean;
  isReviewed!: boolean;

  constructor(
    teamMemberId: number,
    memberId: number,
    nickname?: string,
    position?: string,
    profileImageUrl?: string,
    isLeader: boolean = false,
    isReviewed: boolean = false,
  ) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.position = position;
    this.profileImageUrl = profileImageUrl;
    this.isLeader = isLeader;
    this.isReviewed = isReviewed;
  }

  static from(tuple: GetAllTeamMembersTuple) {
    return new GetPostTeamMember(
      tuple.teamMemberId,
      tuple.memberId,
      tuple.nickname,
      tuple.position,
      tuple.profileImageUrl,
      false,
      tuple.postReviewId !== null,
    );
  }

  static fromLeader(leaderMember: Member, postReviewId?: number) {
    return new GetPostTeamMember(
      0,
      leaderMember.id,
      leaderMember.nickname,
      leaderMember.position,
      leaderMember.profileImageUrl,
      true,
      !!postReviewId,
    );
  }
}

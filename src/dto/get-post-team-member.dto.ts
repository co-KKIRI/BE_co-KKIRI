import { GetAllTeamMembersTuple } from '../repository/team-member.query-repository';
import { Member } from '../entity/member.entity';

export class GetPostTeamMember {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  position?: string;
  profileImageUrl?: string;
  isLeader!: boolean;

  constructor(
    teamMemberId: number,
    memberId: number,
    nickname?: string,
    position?: string,
    profileImageUrl?: string,
    isLeader: boolean = false,
  ) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.position = position;
    this.profileImageUrl = profileImageUrl;
    this.isLeader = isLeader;
  }

  static from(tuple: GetAllTeamMembersTuple) {
    return new GetPostTeamMember(
      tuple.teamMemberId,
      tuple.memberId,
      tuple.nickname,
      tuple.position,
      tuple.profileImageUrl,
    );
  }

  static fromLeader(leaderMember: Member) {
    return new GetPostTeamMember(
      0,
      leaderMember.id,
      leaderMember.nickname,
      leaderMember.position,
      leaderMember.profileImageUrl,
      true,
    );
  }
}

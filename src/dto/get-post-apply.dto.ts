import { GetAllTeamMembersTuple } from '../repository/team-member.query-repository';

export class GetAppliedPostMember {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  position?: string;
  profileImageUrl?: string;

  constructor(teamMemberId: number, memberId: number, nickname?: string, position?: string, profileImageUrl?: string) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.position = position;
    this.profileImageUrl = profileImageUrl;
  }

  static from(tuple: GetAllTeamMembersTuple) {
    return new GetAppliedPostMember(
      tuple.teamMemberId,
      tuple.memberId,
      tuple.nickname,
      tuple.position,
      tuple.profileImageUrl,
    );
  }
}

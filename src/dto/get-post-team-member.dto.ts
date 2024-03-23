import { GetAllTeamMembersTuple } from '../repository/team-member.query-repository';

export class GetPostTeamMemberDto {
  appliedPostMemberList!: GetPostTeamMember[];

  constructor(appliedPostMemberList: GetPostTeamMember[]) {
    this.appliedPostMemberList = appliedPostMemberList;
  }

  static from(tuples: GetAllTeamMembersTuple[], leaderMemberId: number) {
    const appliedPostMemberList = tuples.map((tuple) => {
      return GetPostTeamMember.from(tuple, leaderMemberId);
    });
    return new GetPostTeamMemberDto(appliedPostMemberList);
  }
}

export class GetPostTeamMember {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  position?: string;
  profileImageUrl?: string;
  isLeader!: boolean;

  constructor(
    leaderMemberId: number,
    teamMemberId: number,
    memberId: number,
    nickname?: string,
    position?: string,
    profileImageUrl?: string,
  ) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.position = position;
    this.profileImageUrl = profileImageUrl;
    this.isLeader = memberId === leaderMemberId;
  }

  static from(tuple: GetAllTeamMembersTuple, leaderMemberId: number) {
    return new GetPostTeamMember(
      leaderMemberId,
      tuple.teamMemberId,
      tuple.memberId,
      tuple.nickname,
      tuple.position,
      tuple.profileImageUrl,
    );
  }
}

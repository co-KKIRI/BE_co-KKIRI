import { GetAllTeamMembersTuple } from '../repository/team-member.query-repository';

export class GetStudyTeamMemberDto {
  appliedStudyMemberList!: GetStudyTeamMember[];

  constructor(appliedStudyMemberList: GetStudyTeamMember[]) {
    this.appliedStudyMemberList = appliedStudyMemberList;
  }

  static from(tuples: GetAllTeamMembersTuple[], leaderMemberId: number) {
    const appliedStudyMemberList = tuples.map((tuple) => {
      return new GetStudyTeamMember(
        leaderMemberId,
        tuple.teamMemberId,
        tuple.memberId,
        tuple.nickname,
        tuple.profileImageUrl,
      );
    });
    return new GetStudyTeamMemberDto(appliedStudyMemberList);
  }
}

export class GetStudyTeamMember {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;
  isLeader!: boolean;

  constructor(
    leaderMemberId: number,
    teamMemberId: number,
    memberId: number,
    nickname?: string,
    profileImageUrl?: string,
  ) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.isLeader = memberId === leaderMemberId;
  }
}

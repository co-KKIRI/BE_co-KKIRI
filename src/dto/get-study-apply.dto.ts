import { GetAllReadyTeamMembersTuple } from '../repository/team-member.query-repository';

export class GetStudyApplyDto {
  appliedStudyMemberList!: GetAppliedStudyMember[];

  constructor(appliedStudyMemberList: GetAppliedStudyMember[]) {
    this.appliedStudyMemberList = appliedStudyMemberList;
  }

  static from(tuples: GetAllReadyTeamMembersTuple[]) {
    const appliedStudyMemberList = tuples.map((tuple) => {
      return new GetAppliedStudyMember(tuple.teamMemberId, tuple.memberId, tuple.nickname, tuple.profileImageUrl);
    });
    return new GetStudyApplyDto(appliedStudyMemberList);
  }
}

export class GetAppliedStudyMember {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;

  constructor(teamMemberId: number, memberId: number, nickname?: string, profileImageUrl?: string) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}

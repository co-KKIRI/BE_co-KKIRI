import { GetAllTeamMembersTuple } from '../repository/team-member.query-repository';

export class GetPostApplyDto {
  appliedPostMemberList!: GetAppliedPostMember[];

  constructor(appliedPostMemberList: GetAppliedPostMember[]) {
    this.appliedPostMemberList = appliedPostMemberList;
  }

  static from(tuples: GetAllTeamMembersTuple[]) {
    const appliedPostMemberList = tuples.map((tuple) => {
      return new GetAppliedPostMember(tuple.teamMemberId, tuple.memberId, tuple.nickname, tuple.profileImageUrl);
    });
    return new GetPostApplyDto(appliedPostMemberList);
  }
}

export class GetAppliedPostMember {
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

import { ApiProperty } from '@nestjs/swagger';

export class StudyTeamMemberResponse {
  @ApiProperty()
  studyTeamMemberList!: StudyTeamMember[];

  constructor(studyTeamMemberList: StudyTeamMember[]) {
    this.studyTeamMemberList = studyTeamMemberList;
  }
}

export class StudyTeamMember {
  @ApiProperty()
  teamMemberId!: number;
  @ApiProperty()
  memberId!: number;
  @ApiProperty()
  nickname!: string;
  @ApiProperty()
  profileImageUrl!: string;
  @ApiProperty()
  isLeader!: boolean;

  constructor(teamMemberId: number, memberId: number, nickname: string, profileImageUrl: string, isLeader: boolean) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.isLeader = isLeader;
  }
}

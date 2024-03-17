import { ApiProperty } from '@nestjs/swagger';

export class StudyApplyResponse {
  @ApiProperty()
  appliedStudyMemberList!: AppliedStudyMember[];
}

export class AppliedStudyMember {
  @ApiProperty()
  teamMemberId!: number;
  @ApiProperty()
  memberId!: number;
  @ApiProperty()
  nickname!: string;
  @ApiProperty()
  profileImageUrl!: string;

  constructor(teamMemberId: number, memberId: number, nickname: string, profileImageUrl: string) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { GetStudyApplyDto } from '../get-study-apply.dto';

export class StudyApplyResponse {
  @ApiProperty()
  appliedStudyMemberList!: AppliedStudyMember[];

  constructor(appliedStudyMemberList: AppliedStudyMember[]) {
    this.appliedStudyMemberList = appliedStudyMemberList;
  }

  static from(getStudyApplyDto: GetStudyApplyDto) {
    const appliedStudyMemberList = getStudyApplyDto.appliedStudyMemberList.map((appliedStudyMember) => {
      return new AppliedStudyMember(
        appliedStudyMember.teamMemberId,
        appliedStudyMember.memberId,
        appliedStudyMember.nickname,
        appliedStudyMember.profileImageUrl,
      );
    });
    return new StudyApplyResponse(appliedStudyMemberList);
  }
}

export class AppliedStudyMember {
  @ApiProperty()
  teamMemberId!: number;
  @ApiProperty()
  memberId!: number;
  @ApiProperty()
  nickname?: string;
  @ApiProperty()
  profileImageUrl?: string;

  constructor(teamMemberId: number, memberId: number, nickname?: string, profileImageUrl?: string) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { GetStudyTeamMemberDto } from '../get-study-team-member.dto';

export class StudyTeamMemberResponse {
  @ApiProperty()
  studyTeamMemberList!: StudyTeamMember[];

  constructor(studyTeamMemberList: StudyTeamMember[]) {
    this.studyTeamMemberList = studyTeamMemberList;
  }

  static from(getStudyTeamMemberDto: GetStudyTeamMemberDto) {
    const studyTeamMemberList = getStudyTeamMemberDto.appliedStudyMemberList.map((appliedStudyMember) => {
      return new StudyTeamMember(
        appliedStudyMember.isLeader,
        appliedStudyMember.teamMemberId,
        appliedStudyMember.memberId,
        appliedStudyMember.nickname,
        appliedStudyMember.profileImageUrl,
      );
    });
    return new StudyTeamMemberResponse(studyTeamMemberList);
  }
}

export class StudyTeamMember {
  @ApiProperty()
  teamMemberId!: number;
  @ApiProperty()
  memberId!: number;
  @ApiProperty()
  nickname?: string;
  @ApiProperty()
  profileImageUrl?: string;
  @ApiProperty()
  isLeader!: boolean;

  constructor(isLeader: boolean, teamMemberId: number, memberId: number, nickname?: string, profileImageUrl?: string) {
    this.isLeader = isLeader;
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}

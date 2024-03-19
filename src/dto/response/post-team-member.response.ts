import { ApiProperty } from '@nestjs/swagger';
import { GetPostTeamMember, GetPostTeamMemberDto } from '../get-post-team-member.dto';

export class PostTeamMemberResponse {
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

  static fromList(getPostTeamMember: GetPostTeamMember[]) {
    return getPostTeamMember.map(
      (getPostTeamMember) =>
        new PostTeamMemberResponse(
          getPostTeamMember.isLeader,
          getPostTeamMember.teamMemberId,
          getPostTeamMember.memberId,
          getPostTeamMember.nickname,
          getPostTeamMember.profileImageUrl,
        ),
    );
  }
}

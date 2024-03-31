import { ApiProperty } from '@nestjs/swagger';
import { GetPostTeamMember } from '../get-post-team-member.dto';

export class PostTeamMemberResponse {
  @ApiProperty()
  teamMemberId!: number;
  @ApiProperty()
  memberId!: number;
  @ApiProperty()
  nickname?: string;
  @ApiProperty()
  position?: string;
  @ApiProperty()
  profileImageUrl?: string;
  @ApiProperty()
  isLeader!: boolean;
  @ApiProperty()
  isReviewed!: boolean;

  constructor(
    isLeader: boolean,
    teamMemberId: number,
    memberId: number,
    isReviewed: boolean,
    nickname?: string,
    position?: string,
    profileImageUrl?: string,
  ) {
    this.isLeader = isLeader;
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.position = position;
    this.profileImageUrl = profileImageUrl;
    this.isReviewed = isReviewed;
  }

  static fromList(getPostTeamMember: GetPostTeamMember[]) {
    return getPostTeamMember.map(
      (getPostTeamMember) =>
        new PostTeamMemberResponse(
          getPostTeamMember.isLeader,
          getPostTeamMember.teamMemberId,
          getPostTeamMember.memberId,
          getPostTeamMember.isReviewed,
          getPostTeamMember.nickname,
          getPostTeamMember.position,
          getPostTeamMember.profileImageUrl,
        ),
    );
  }
}

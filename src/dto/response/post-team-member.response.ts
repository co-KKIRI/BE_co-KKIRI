import { ApiProperty } from '@nestjs/swagger';
import { GetPostTeamMemberDto } from '../get-post-team-member.dto';

export class PostTeamMember {
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

export class PostTeamMemberResponse {
  @ApiProperty({ type: [PostTeamMember] })
  postTeamMemberList!: PostTeamMember[];

  constructor(postTeamMemberList: PostTeamMember[]) {
    this.postTeamMemberList = postTeamMemberList;
  }

  static from(getPostTeamMemberDto: GetPostTeamMemberDto) {
    const postTeamMemberList = getPostTeamMemberDto.appliedPostMemberList.map((appliedPostMember) => {
      return new PostTeamMember(
        appliedPostMember.isLeader,
        appliedPostMember.teamMemberId,
        appliedPostMember.memberId,
        appliedPostMember.nickname,
        appliedPostMember.profileImageUrl,
      );
    });
    return new PostTeamMemberResponse(postTeamMemberList);
  }
}

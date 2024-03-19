import { ApiProperty } from '@nestjs/swagger';
import { GetPostApplyDto } from '../get-post-apply.dto';

export class AppliedPostMember {
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

export class PostApplyResponse {
  @ApiProperty({ type: [AppliedPostMember] })
  appliedPostMemberList!: AppliedPostMember[];

  constructor(appliedPostMemberList: AppliedPostMember[]) {
    this.appliedPostMemberList = appliedPostMemberList;
  }

  static from(getPostApplyDto: GetPostApplyDto) {
    const appliedPostMemberList = getPostApplyDto.appliedPostMemberList.map((appliedPostMember) => {
      return new AppliedPostMember(
        appliedPostMember.teamMemberId,
        appliedPostMember.memberId,
        appliedPostMember.nickname,
        appliedPostMember.profileImageUrl,
      );
    });
    return new PostApplyResponse(appliedPostMemberList);
  }
}

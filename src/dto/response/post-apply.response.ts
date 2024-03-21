import { ApiProperty } from '@nestjs/swagger';
import { GetAppliedPostMember } from '../get-post-apply.dto';

export class PostApplyResponse {
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

  constructor(teamMemberId: number, memberId: number, nickname?: string, position?: string, profileImageUrl?: string) {
    this.teamMemberId = teamMemberId;
    this.memberId = memberId;
    this.nickname = nickname;
    this.position = position;
    this.profileImageUrl = profileImageUrl;
  }

  static fromList(getAppliedPostMemberList: GetAppliedPostMember[]) {
    return getAppliedPostMemberList.map(
      (getAppliedPostMember) =>
        new PostApplyResponse(
          getAppliedPostMember.teamMemberId,
          getAppliedPostMember.memberId,
          getAppliedPostMember.nickname,
          getAppliedPostMember.position,
          getAppliedPostMember.profileImageUrl,
        ),
    );
  }
}

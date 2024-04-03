import { ApiProperty } from '@nestjs/swagger';
import { GetInvitedPostMember } from '../get-post-invite.dto';

export class PostInviteResponse {
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

  static fromList(getInvitedPostMemberList: GetInvitedPostMember[]) {
    return getInvitedPostMemberList.map(
      (getAppliedPostMember) =>
        new PostInviteResponse(
          getAppliedPostMember.teamMemberId,
          getAppliedPostMember.memberId,
          getAppliedPostMember.nickname,
          getAppliedPostMember.position,
          getAppliedPostMember.profileImageUrl,
        ),
    );
  }
}

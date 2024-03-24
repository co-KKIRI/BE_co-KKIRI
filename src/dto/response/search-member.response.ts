import { ApiProperty } from '@nestjs/swagger';

export class SearchMemberResponse {
  @ApiProperty()
  memberId!: number;
  @ApiProperty()
  stacks: string[];
  @ApiProperty()
  nickname?: string;
  @ApiProperty()
  profileImageUrl?: string;
  @ApiProperty()
  position?: string;
  @ApiProperty()
  career?: number;

  constructor(
    memberId: number,
    stacks: string[],
    nickname?: string,
    profileImageUrl?: string,
    position?: string,
    career?: number,
  ) {
    this.memberId = memberId;
    this.stacks = stacks;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.position = position;
    this.career = career;
  }

  static fromList(searchMemberProfileList: SearchMemberResponse[]) {
    return searchMemberProfileList.map(
      (searchMemberProfile) =>
        new SearchMemberResponse(
          searchMemberProfile.memberId,
          searchMemberProfile.stacks,
          searchMemberProfile.nickname,
          searchMemberProfile.profileImageUrl,
          searchMemberProfile.position,
          searchMemberProfile.career,
        ),
    );
  }
}

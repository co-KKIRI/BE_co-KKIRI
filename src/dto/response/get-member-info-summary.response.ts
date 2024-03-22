export class GetMemberInfoSummaryResponse {
  nickname?: string;
  profileImageUrl?: string;

  constructor(nickname: string, profileImageUrl: string) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}

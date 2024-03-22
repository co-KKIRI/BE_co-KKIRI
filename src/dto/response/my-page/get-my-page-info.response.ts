export class GetMyPageInfoResponse {
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
  career?: number;
  introduce?: string;
  stack?: string[];
  link?: string;

  constructor(
    nickname?: string,
    profileImageUrl?: string,
    position?: string,
    career?: number,
    introduce?: string,
    stack?: string[],
    link?: string,
  ) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.position = position;
    this.career = career;
    this.introduce = introduce;
    this.stack = stack;
    this.link = link;
  }
}

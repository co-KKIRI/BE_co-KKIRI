export class GetMyPageInfoResponse {
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
  career?: number;
  introduce?: string;
  stack?: string[];
  link?: string;
  isVisibleProfile?: boolean;

  constructor(
    nickname?: string,
    profileImageUrl?: string,
    position?: string,
    career?: number,
    introduce?: string,
    stack?: string[],
    link?: string,
    isVisibleProfile?: boolean,
  ) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.position = position;
    this.career = career;
    this.introduce = introduce;
    this.stack = stack;
    this.link = link;
    this.isVisibleProfile = isVisibleProfile;
  }
}

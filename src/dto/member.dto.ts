import { Member } from '../entity/member.entity';

export class MemberDto {
  memberId: number;
  nickname?: string;
  profileImageUrl?: string;
  career?: number;
  position?: string;
  stacks: string[];
  gauge?: number;
  link?: string;
  introduce?: string;
  isVisibleProfile: boolean;
  isMine: boolean;

  constructor(
    memberId: number,
    stacks: string[],
    isVisibleProfile: boolean,
    nickname?: string,
    profileImageUrl?: string,
    career?: number,
    position?: string,
    gauge?: number,
    link?: string,
    introduce?: string,
    isMine: boolean = false,
  ) {
    this.memberId = memberId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.career = career;
    this.position = position;
    this.stacks = stacks;
    this.gauge = gauge;
    this.link = link;
    this.introduce = introduce;
    this.isVisibleProfile = isVisibleProfile;
    this.isMine = isMine;
  }

  static from(member: Member, currentMemberId: number) {
    return new MemberDto(
      member.id,
      member.stack ? JSON.parse(member.stack) : [],
      member.isVisibleProfile,
      member.nickname,
      member.profileImageUrl,
      member.career,
      member.position,
      0,
      member.link,
      member.introduce,
      member.id === currentMemberId,
    );
  }
}

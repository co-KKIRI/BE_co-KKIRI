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

  constructor(
    memberId: number,
    stacks: string[],
    nickname?: string,
    profileImageUrl?: string,
    career?: number,
    position?: string,
    gauge?: number,
    link?: string,
    introduce?: string,
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
  }

  static from(member: Member) {
    return new MemberDto(
      member.id,
      member.stack ? JSON.parse(member.stack) : [],
      member.nickname,
      member.profileImageUrl,
      member.career,
      member.position,
      0,
      member.link,
      member.introduce,
    );
  }
}

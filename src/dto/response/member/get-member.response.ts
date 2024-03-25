import { MemberDto } from '../../member.dto';

export class GetMemberResponse {
  memberId: number;
  nickname?: string;
  profileImageUrl?: string;
  career?: number;
  position?: string;
  stack: string[];
  gauge?: number;
  link?: string;
  introduce?: string;

  constructor(
    memberId: number,
    stack: string[],
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
    this.stack = stack;
    this.gauge = gauge;
    this.link = link;
    this.introduce = introduce;
  }

  static from(memberDto: MemberDto) {
    return new GetMemberResponse(
      memberDto.memberId,
      memberDto.stack,
      memberDto.nickname,
      memberDto.profileImageUrl,
      memberDto.career,
      memberDto.position,
      memberDto.gauge,
      memberDto.link,
      memberDto.introduce,
    );
  }
}

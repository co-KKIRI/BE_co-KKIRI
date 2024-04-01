import { MemberDto } from '../../member.dto';

export class GetMemberResponse {
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
    isMine: boolean,
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
    this.isVisibleProfile = isVisibleProfile;
    this.isMine = isMine;
  }

  static from(memberDto: MemberDto) {
    return new GetMemberResponse(
      memberDto.memberId,
      memberDto.stacks,
      memberDto.isVisibleProfile,
      memberDto.isMine,
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

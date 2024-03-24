import { SearchedMemberTuple } from '../repository/member-search.query-repository';

export class SearchMemberDto {
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
  career?: number;
  stacks: string[];

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

  static from(searchMemberTuple: SearchedMemberTuple) {
    return new SearchMemberDto(
      searchMemberTuple.memberId,
      searchMemberTuple.stacks ? JSON.parse(searchMemberTuple.stacks) : [],
      searchMemberTuple.nickname,
      searchMemberTuple.profileImageUrl,
      searchMemberTuple.position,
      searchMemberTuple.career,
    );
  }
}

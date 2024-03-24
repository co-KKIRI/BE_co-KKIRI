import { Injectable } from '@nestjs/common';
import { MemberSearchQueryRepository } from '../repository/member-search.query-repository';
import { SearchMemberDto } from '../dto/search-member.dto';
import { SearchMemberRequest } from '../dto/request/search-member.request';

@Injectable()
export class MemberSearchService {
  constructor(private readonly memberSearchQueryRepository: MemberSearchQueryRepository) {}

  async searchMember(searchMemberRequest: SearchMemberRequest) {
    const stacks = searchMemberRequest.stacks ?? [];
    const position = searchMemberRequest.position;

    const searchedMemberTuples = await this.memberSearchQueryRepository.searchMember(
      searchMemberRequest,
      stacks,
      position,
    );

    const totalCount = await this.memberSearchQueryRepository.searchMemberTotalCount(stacks, position);

    const searchMemberProfileList = searchedMemberTuples.map((searchedMemberTuple) =>
      SearchMemberDto.from(searchedMemberTuple),
    );

    return { searchMemberProfileList, totalCount };
  }
}

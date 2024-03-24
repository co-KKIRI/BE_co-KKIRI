import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { GetMemberInfoSummaryResponse } from 'src/dto/response/member/get-member-info-summary.response';
import { RolesGuard } from 'src/guard/roles.guard';
import { MemberService } from 'src/service/member.service';
import { MemberSearchService } from '../service/member-search.service';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { PaginationResponse } from '../common/pagination/pagination-response';
import { SearchMemberResponse } from '../dto/response/search-member.response';
import { Roles } from '../common/roles/roles.decorator';
import { SearchMemberRequest } from '../dto/request/search-member.request';

@Controller('member')
@UseGuards(RolesGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly memberSearchService: MemberSearchService,
  ) {}

  @ApiOperation({ summary: '유저 정보 요약' })
  @Get('/info/summary')
  async getMyInfo(@Req() req): Promise<GetMemberInfoSummaryResponse> {
    return this.memberService.getMemberInfoSummary(req.user.id);
  }

  @ApiOperation({ summary: '유저 검색' })
  @Get('/search')
  @Roles('anyone')
  async searchMember(@Query() searchMemberRequest: SearchMemberRequest) {
    const { searchMemberProfileList, totalCount } = await this.memberSearchService.searchMember(searchMemberRequest);

    return PaginationResponse.of({
      data: SearchMemberResponse.fromList(searchMemberProfileList),
      options: searchMemberRequest,
      totalCount,
    });
  }
}

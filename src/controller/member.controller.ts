import { Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetMemberInfoSummaryResponse } from 'src/dto/response/member/get-member-info-summary.response';
import { RolesGuard } from 'src/guard/roles.guard';
import { MemberService } from 'src/service/member.service';
import { MemberSearchService } from '../service/member-search.service';
import { PaginationResponse } from '../common/pagination/pagination-response';
import { SearchMemberResponse } from '../dto/response/search-member.response';
import { Roles } from '../common/roles/roles.decorator';
import { SearchMemberRequest } from '../dto/request/search-member.request';
import { GetMemberResponse } from '../dto/response/member/get-member.response';
import { ConfigService } from '@nestjs/config';

@Controller('member')
@UseGuards(RolesGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly memberSearchService: MemberSearchService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '유저 정보 요약' })
  @Get('/info/summary')
  async getMyInfo(@Req() req): Promise<GetMemberInfoSummaryResponse> {
    return this.memberService.getMemberInfoSummary(req.user.id);
  }

  @ApiOperation({ summary: '유저 검색' })
  @Get('/search')
  async searchMember(@Query() searchMemberRequest: SearchMemberRequest, @Req() req) {
    const { searchMemberProfileList, totalCount } = await this.memberSearchService.searchMember(
      searchMemberRequest,
      req.user.id,
    );

    return PaginationResponse.of({
      data: SearchMemberResponse.fromList(searchMemberProfileList),
      options: searchMemberRequest,
      totalCount,
    });
  }

  @ApiOperation({ summary: '유저 정보' })
  @Get('/:id')
  async getMember(@Param('id', ParseIntPipe) memberId: number) {
    const memberDto = await this.memberService.getMember(memberId);
    return GetMemberResponse.from(memberDto);
  }

  @ApiOperation({ summary: '유저 로그아웃' })
  @Post('/logout')
  async handleRedirect(@Res() res) {
    res.clearCookie(this.configService.get('COOKIE_NAME'), {domain: this.configService.get('SESSION_COOKIE_DOMAIN')});
    res.status(200).send();
  }
}

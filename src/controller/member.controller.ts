import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetMemberInfoSummaryResponse } from 'src/dto/response/member/get-member-info-summary.response';
import { RolesGuard } from 'src/guard/roles.guard';
import { MemberService } from 'src/service/member.service';

@Controller('member')
@UseGuards(RolesGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: '유저 정보 요약' })
  @Get('/info/summary')
  async getMyInfo(@Req() req): Promise<GetMemberInfoSummaryResponse> {
    return this.memberService.getMemberInfoSummary(req.user.id);
  }
}

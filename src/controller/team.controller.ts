import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTeamInviteInfoResponse } from 'src/dto/response/team/get-team-invite-info.response';
import { RolesGuard } from 'src/guard/roles.guard';
import { TeamService } from 'src/service/team.service';

@ApiTags('Team')
@Controller('team')
@UseGuards(RolesGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: '팀 초대 조회' })
  @Get('/:teamInviteId')
  async getTeamInviteInfo(
    @Param('teamInviteId', ParseIntPipe) teamInviteId: number,
    @Req() req,
  ): Promise<GetTeamInviteInfoResponse> {
    return this.teamService.getTeamInviteInfo(req.user.id, teamInviteId);
  }
}

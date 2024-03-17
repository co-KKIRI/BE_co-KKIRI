import { Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudyTeamMemberResponse } from '../dto/response/study-team-member.response';

@Controller()
export class StudyTeamMemberController {
  constructor() {}

  @Patch('/study/team-member/:teamMemberId/accept')
  acceptTeamMember(): void {
    return;
  }

  @Patch('/study/team-member/:teamMemberId/reject')
  rejectTeamMember(): void {
    return;
  }

  @Get('/study/:postId/team-member')
  getStudyTeamMember(@Param('postId', ParseIntPipe) postId: number): StudyTeamMemberResponse {
    return {} as StudyTeamMemberResponse;
  }

  @Delete('/study/team-member/:teamMemberId/out')
  deleteTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): void {}
}

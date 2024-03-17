import { Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudyTeamMemberResponse } from '../dto/response/study-team-member.response';
import { StudyTeamMemberService } from '../service/study-team-member.service';

@Controller()
export class StudyTeamMemberController {
  constructor(private readonly studyTeamMemberService: StudyTeamMemberService) {}

  @Patch('/study/team-member/:teamMemberId/accept')
  async acceptTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.studyTeamMemberService.acceptTeamMember(teamMemberId);
  }

  @Patch('/study/team-member/:teamMemberId/reject')
  async rejectTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.studyTeamMemberService.rejectTeamMember(teamMemberId);
  }

  @Get('/study/:postId/team-member')
  async getAllStudyTeamMember(@Param('postId', ParseIntPipe) postId: number): Promise<StudyTeamMemberResponse> {
    const getStudyTeamMemberDto = await this.studyTeamMemberService.getAllStudyTeamMember(postId);
    return StudyTeamMemberResponse.from(getStudyTeamMemberDto);
  }

  @Delete('/study/team-member/:teamMemberId/out')
  async deleteTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.studyTeamMemberService.deleteTeamMember(teamMemberId);
  }
}

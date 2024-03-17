import { Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudyTeamMemberResponse } from '../dto/response/study-team-member.response';
import { StudyTeamMemberService } from '../service/study-team-member.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('StudyTeamMember')
@Controller()
export class StudyTeamMemberController {
  constructor(private readonly studyTeamMemberService: StudyTeamMemberService) {}

  @ApiOperation({ summary: '스터디 신청 수락' })
  @Patch('/study/team-member/:teamMemberId/accept')
  async acceptTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.studyTeamMemberService.acceptTeamMember(teamMemberId);
  }

  @ApiOperation({ summary: '스터디 신청 거절' })
  @Patch('/study/team-member/:teamMemberId/reject')
  async rejectTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.studyTeamMemberService.rejectTeamMember(teamMemberId);
  }

  @ApiOperation({ summary: '스터디 멤버 목록' })
  @ApiCreatedResponse({ type: StudyTeamMemberResponse })
  @Get('/study/:postId/team-member')
  async getAllStudyTeamMember(@Param('postId', ParseIntPipe) postId: number): Promise<StudyTeamMemberResponse> {
    const getStudyTeamMemberDto = await this.studyTeamMemberService.getAllStudyTeamMember(postId);
    return StudyTeamMemberResponse.from(getStudyTeamMemberDto);
  }

  @ApiOperation({ summary: '스터디 현재 팀원 삭제' })
  @Delete('/study/team-member/:teamMemberId/out')
  async deleteTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.studyTeamMemberService.deleteTeamMember(teamMemberId);
  }
}

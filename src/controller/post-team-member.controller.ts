import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { PostTeamMemberResponse } from '../dto/response/post-team-member.response';
import { PostTeamMemberService } from '../service/post-team-member.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { ApiPaginatedResponse } from '../common/pagination/pagination.decorator';
import { PaginationResponse } from '../common/pagination/pagination-response';

@ApiTags('PostTeamMember')
@Controller()
export class PostTeamMemberController {
  constructor(private readonly postTeamMemberService: PostTeamMemberService) {}

  @ApiOperation({ summary: '스터디/프로젝트 신청 수락' })
  @Patch('/post/team-member/:teamMemberId/accept')
  async acceptTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.postTeamMemberService.acceptTeamMember(teamMemberId);
  }

  @ApiOperation({ summary: '스터디/프로젝트 신청 거절' })
  @Patch('/post/team-member/:teamMemberId/reject')
  async rejectTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.postTeamMemberService.rejectTeamMember(teamMemberId);
  }

  @ApiOperation({ summary: '스터디/프로젝트 멤버 목록' })
  @ApiPaginatedResponse(PostTeamMemberResponse)
  @Get('/post/:postId/team-member')
  async getAllPostTeamMember(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() paginationRequest: PaginationRequest,
  ): Promise<PaginationResponse<PostTeamMemberResponse>> {
    const { getPostTeamMembers, totalCount } = await this.postTeamMemberService.getAllPostTeamMember(
      postId,
      paginationRequest,
    );

    return PaginationResponse.of({
      data: PostTeamMemberResponse.fromList(getPostTeamMembers),
      options: paginationRequest,
      totalCount: totalCount,
    });
  }

  @ApiOperation({ summary: '스터디/프로젝트 현재 팀원 삭제' })
  @Delete('/post/team-member/:teamMemberId')
  async deleteTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
    await this.postTeamMemberService.deleteTeamMember(teamMemberId);
  }
}

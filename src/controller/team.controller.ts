import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from '@nestjs/common';
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

  // @ApiOperation({ summary: '유저 정보' })
  // @Get('/info')
  // async getMyInfo(@Req() req): Promise<GetMyPageInfoResponse> {
  //   return this.mypageService.getMyPageInfo(req.user.id);
  // }

  // @ApiOperation({ summary: '유저 정보 수정' })
  // @Patch('/info')
  // async patchMyInfo(@Req() req, @Body() memberInfo: PatchMyPageInfoDto): Promise<void> {
  //   return this.mypageService.patchMyPageInfo(req.user.id, memberInfo);
  // }

  // @ApiOperation({ summary: '팀 초대된 목록' })
  // @Get('/invite/list')
  // async getMyPageInviteList(
  //   @Req() req,
  //   @Query() paginationRequest: PaginationRequest,
  // ): Promise<PaginationResponse<GetMyPageInviteResponse>> {
  //   const { inviteList, totalCount } = await this.mypageService.getMyPageInviteList(req.user.id, paginationRequest);

  //   return PaginationResponse.of({
  //     data: inviteList,
  //     options: paginationRequest,
  //     totalCount,
  //   });
  // }

  // @ApiOperation({ summary: '스크랩 목록' })
  // @Get('/scrap/list')
  // async getMyScrapList(
  //   @Req() req,
  //   @Query() paginationRequest: PaginationRequest,
  // ): Promise<PaginationResponse<GetMyPageScrapResponse>> {
  //   const { myPageScrapList, totalCount } = await this.mypageService.getMyPageScrapList(req.user.id, paginationRequest);

  //   return PaginationResponse.of({
  //     data: myPageScrapList,
  //     options: paginationRequest,
  //     totalCount,
  //   });
  // }

  // @ApiOperation({ summary: '프로필 공개 여부' })
  // @Get('/visible-profile')
  // async getMyPageVisibleProfile(@Req() req): Promise<GetMyPageVisibleProfileResponse> {
  //   return this.mypageService.getMyPageVisibleProfile(req.user.id);
  // }

  // @ApiOperation({ summary: '프로필 공개 여부 수정' })
  // @Patch('/visible-profile')
  // async patchVisibleProfile(@Req() req, @Body() body: PatchMyPageVisibleProfileRequest): Promise<void> {
  //   return this.mypageService.patchVisibleProfile(req.user.id, body.isVisibleProfile);
  // }
}

// @ApiTags('PostTeamMember')
// @Controller()
// export class PostTeamMemberController {
//   constructor(private readonly postTeamMemberService: PostTeamMemberService) {}

//   @ApiOperation({ summary: '스터디/프로젝트 신청 수락' })
//   @Patch('/post/team-member/:teamMemberId/accept')
//   async acceptTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
//     await this.postTeamMemberService.acceptTeamMember(teamMemberId);
//   }

//   @ApiOperation({ summary: '스터디/프로젝트 신청 거절' })
//   @Patch('/post/team-member/:teamMemberId/reject')
//   async rejectTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
//     await this.postTeamMemberService.rejectTeamMember(teamMemberId);
//   }

//   @ApiOperation({ summary: '스터디/프로젝트 멤버 목록' })
//   @ApiCreatedResponse({ type: PostTeamMemberResponse })
//   @Get('/post/:postId/team-member')
//   async getAllPostTeamMember(@Param('postId', ParseIntPipe) postId: number): Promise<PostTeamMemberResponse> {
//     const getPostTeamMemberDto = await this.postTeamMemberService.getAllPostTeamMember(postId);
//     return PostTeamMemberResponse.from(getPostTeamMemberDto);
//   }

//   @ApiOperation({ summary: '스터디/프로젝트 현재 팀원 삭제' })
//   @Delete('/post/team-member/:teamMemberId')
//   async deleteTeamMember(@Param('teamMemberId', ParseIntPipe) teamMemberId: number): Promise<void> {
//     await this.postTeamMemberService.deleteTeamMember(teamMemberId);
//   }
// }

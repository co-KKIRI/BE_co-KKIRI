import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatchMyPageInfoDto } from 'src/dto/request/my-page/patch-my-page-info.dto';
import { GetMyPageInfoResponse } from 'src/dto/response/my-page/get-my-page-info.response';
import { MyPageService } from 'src/service/my-page.service';

@ApiTags('MyPage')
@Controller('my-page')
export class MyPageController {
  constructor(private readonly mypageService: MyPageService) {}

  @ApiOperation({ summary: '유저 정보' })
  @Get('/info')
  async getMyInfo(@Req() req): Promise<GetMyPageInfoResponse> {
    return this.mypageService.getMyPageInfo(req.user.id);
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @Patch('/info')
  async patchMyInfo(@Req() req, @Body() memberInfo: PatchMyPageInfoDto): Promise<void> {
    return this.mypageService.patchMyPageInfo(req.user.id, memberInfo);
  }

  @ApiOperation({ summary: '팀 초대된 목록' })
  @Get('/invite/list')
  async getInvitedTeamList() {}

  @ApiOperation({ summary: '스크랩 목록' })
  @Get('/scrap/list')
  async getMyScrapList() {}

  @ApiOperation({ summary: '프로필 공개 여부 수정' })
  @Patch('/visible-profile')
  async patchProfileVisible() {}
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

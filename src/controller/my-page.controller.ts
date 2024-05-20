import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Req,
  Res,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationRequest } from 'src/common/pagination/pagination-request';
import { PaginationResponse } from 'src/common/pagination/pagination-response';
import { PatchMyPageInfoDto } from 'src/dto/request/my-page/patch-my-page-info.dto';
import { PatchMyPageVisibleProfileRequest } from 'src/dto/request/my-page/patch-my-page-visible-profile';
import { GetMyPageInfoResponse } from 'src/dto/response/my-page/get-my-page-info.response';
import { GetMyPageInviteResponse } from 'src/dto/response/my-page/get-my-page-invite.response';
import { GetMyPageReviewResponse } from 'src/dto/response/my-page/get-my-page-review.response';
import { GetMyPageScrapResponse } from 'src/dto/response/my-page/get-my-page-scrap.response';
import { GetMyPageVisibleProfileResponse } from 'src/dto/response/my-page/get-my-page-visible-profile.response';
import { RolesGuard } from 'src/guard/roles.guard';
import { MyPageService } from 'src/service/my-page.service';
import { UnlinkService } from 'src/service/social-account-unlink.service';

@ApiTags('MyPage')
@Controller('my-page')
@UseGuards(RolesGuard)
export class MyPageController {
  constructor(
    private readonly mypageService: MyPageService,
    private readonly configService: ConfigService,
    private readonly unlinkService: UnlinkService,
  ) {}

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

  @ApiOperation({ summary: '유저 탈퇴' })
  @Delete('/info')
  async deleteMyInfo(@Req() req, @Res() res): Promise<void> {
    const { accessToken, socialProvider, id } = req.user;

    await this.unlinkService.unlink(socialProvider, accessToken);
    await this.mypageService.deleteMyPageInfo(id);
    res.clearCookie(this.configService.get('COOKIE_NAME'), { domain: this.configService.get('SESSION_COOKIE_DOMAIN') });
    res.status(200).send();
  }

  @ApiOperation({ summary: '팀 초대된 목록' })
  @Get('/invite/list')
  async getMyPageInviteList(
    @Req() req,
    @Query() paginationRequest: PaginationRequest,
  ): Promise<PaginationResponse<GetMyPageInviteResponse>> {
    const { inviteList, totalCount } = await this.mypageService.getMyPageInviteList(req.user.id, paginationRequest);

    return PaginationResponse.of({
      data: inviteList,
      options: paginationRequest,
      totalCount,
    });
  }

  @ApiOperation({ summary: '스크랩 목록' })
  @Get('/scrap/list')
  async getMyScrapList(
    @Req() req,
    @Query() paginationRequest: PaginationRequest,
  ): Promise<PaginationResponse<GetMyPageScrapResponse>> {
    const { myPageScrapList, totalCount } = await this.mypageService.getMyPageScrapList(req.user.id, paginationRequest);

    return PaginationResponse.of({
      data: myPageScrapList,
      options: paginationRequest,
      totalCount,
    });
  }

  @ApiOperation({ summary: '프로필 공개 여부' })
  @Get('/visible-profile')
  async getMyPageVisibleProfile(@Req() req): Promise<GetMyPageVisibleProfileResponse> {
    return this.mypageService.getMyPageVisibleProfile(req.user.id);
  }

  @ApiOperation({ summary: '프로필 공개 여부 수정' })
  @Patch('/visible-profile')
  async patchVisibleProfile(@Req() req, @Body() body: PatchMyPageVisibleProfileRequest): Promise<void> {
    return this.mypageService.patchVisibleProfile(req.user.id, body.isVisibleProfile);
  }

  @ApiOperation({ summary: '내가 받은 리뷰 목록' })
  @Get('/review/list')
  async getReviewList(@Req() req): Promise<GetMyPageReviewResponse[]> {
    return this.mypageService.getMyPageReviewList(req.user.id);
  }
}

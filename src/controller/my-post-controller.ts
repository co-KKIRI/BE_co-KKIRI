import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { PaginationResponse } from "src/common/pagination/pagination-response";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
import { Roles } from "src/common/roles/roles.decorator";
import { PostCompleteListResponse } from "src/dto/response/post-complete-list.response";
import { PostListResponse } from "src/dto/response/post-list-response";
import { RolesGuard } from "src/guard/roles.guard";
import { PostListService } from "src/service/post-list.service";

@ApiTags('나의 스터디')
@Controller('my-post')
@UseGuards(RolesGuard)
export class MyPostController {
  constructor(private readonly postListService: PostListService) { }

  @ApiOperation({ summary: '내가 신청한 스터디 목록' })
  @ApiPaginatedResponse(PostListResponse)
  @Get('/apply/list')
  async getMyAppliedPost(@Query() paginationRequest: PaginationRequest, @Req() req)
    : Promise<PaginationResponse<PostListResponse>> {
    const { getMyAppliedPost, totalCount } = await this.postListService.getMyAppliedPost(paginationRequest, req.user.id);
    return PaginationResponse.of({
      data: PostListResponse.from(getMyAppliedPost),
      options: paginationRequest,
      totalCount
    })
  }

  @ApiOperation({ summary: '내가 모집한 스터디 목록' })
  @ApiPaginatedResponse(PostListResponse)
  @Get('/recruit/list')
  async getMyRecruitedPost(@Query() paginationRequest: PaginationRequest, @Req() req)
    : Promise<PaginationResponse<PostListResponse>> {
    const { getMyRecruitedPost, totalCount } = await this.postListService.getMyRecruitedPost(paginationRequest, req.user.id);
    return PaginationResponse.of({
      data: PostListResponse.from(getMyRecruitedPost),
      options: paginationRequest,
      totalCount
    })
  }

  @ApiOperation({ summary: '내가 진행중인 스터디 목록' })
  @ApiPaginatedResponse(PostListResponse)
  @Get('/on-going/list')
  async getMyOnGoingPost(@Query() paginationRequest: PaginationRequest, @Req() req)
    : Promise<PaginationResponse<PostListResponse>> {
    const { getMyOnGoingPost, totalCount } = await this.postListService.getMyOnGoingPost(paginationRequest, req.user.id);
    return PaginationResponse.of({
      data: PostListResponse.from(getMyOnGoingPost),
      options: paginationRequest,
      totalCount
    })
  }

  @ApiOperation({ summary: '내가 완료한 스터디 목록' })
  @ApiPaginatedResponse(PostListResponse)
  @Get('/complete/list')
  async getMyCompletedPost(@Query() paginationRequest: PaginationRequest, @Req() req)
    : Promise<PaginationResponse<PostListResponse>> {
    const { getMyCompletedPost, totalCount } = await this.postListService.getMyCompletedPost(paginationRequest, req.user.id);
    return PaginationResponse.of({
      data: PostCompleteListResponse.from(getMyCompletedPost),
      options: paginationRequest,
      totalCount
    })
  }

  @ApiOperation({ summary: '내가 대기중인 스터디 목록' })
  @ApiPaginatedResponse(PostListResponse)
  @Get('/waiting/list')
  async getMyWaitingPost(@Query() paginationRequest: PaginationRequest, @Req() req)
    : Promise<PaginationResponse<PostListResponse>> {
    const { getMyWaitingPost, totalCount } = await this.postListService.getMyWaitingPost(paginationRequest, req.user.id);
    return PaginationResponse.of({
      data: PostListResponse.from(getMyWaitingPost),
      options: paginationRequest,
      totalCount
    })
  }


}
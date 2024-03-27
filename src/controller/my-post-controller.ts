import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { PaginationResponse } from "src/common/pagination/pagination-response";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
import { Roles } from "src/common/roles/roles.decorator";
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
  async getMyRecruitedPost(@Query() paginationRequest: PaginationRequest, @Req() req)
    : Promise<PaginationResponse<PostListResponse>> {
    const { getMyRecruitedPost, totalCount } = await this.postListService.getMyRecruitedPost(paginationRequest, req.user.id);
    return PaginationResponse.of({
      data: PostListResponse.from(getMyRecruitedPost),
      options: paginationRequest,
      totalCount
    })
  }
}
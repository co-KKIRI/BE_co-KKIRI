import { Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { PaginationResponse } from "src/common/pagination/pagination-response";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
import { Roles } from "src/common/roles/roles.decorator";
import { SearchPostList } from "src/dto/request/search-post-list.request";
import { MainPostResponse } from "src/dto/response/main-page.response";
import { PostListResponse } from "src/dto/response/post-list-response";
import { RolesGuard } from "src/guard/roles.guard";
import { PostListService } from "src/service/post-list.service";

@ApiTags('PostList')
@Controller()
@UseGuards(RolesGuard)
export class PostListController {
  constructor(private readonly postListService: PostListService,) { }

  @Roles('anyone')
  @ApiOperation({ summary: '메인 페이지' })
  @ApiCreatedResponse({ type: MainPostResponse })
  @Get('main/list')
  async getMainPosts(@Req() req): Promise<MainPostResponse> {
    const userId = req.user?.id;
    const mainPostLists = await this.postListService.getMainPostList(userId);
    return MainPostResponse.from(
      mainPostLists.newStudyList,
      mainPostLists.hotStudyList,
      mainPostLists.newProjectList,
      mainPostLists.hotProjectList
    );
  }

  @Roles('anyone')
  @ApiOperation({ summary: '스터디 목록' })
  @ApiPaginatedResponse(PostListResponse)
  @Get('post/list')
  async getPostList(
    @Query() searchPostList: SearchPostList,
    @Req() req,
  ): Promise<PaginationResponse<PostListResponse>> {
    const userId = req.user?.id;
    const { postInfo, totalCount } = await this.postListService.getPostList(searchPostList, userId);
    return PaginationResponse.of({
      data: PostListResponse.from(postInfo),
      options: searchPostList,
      totalCount,
    })
  }


}
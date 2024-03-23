import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { PaginationResponse } from "src/common/pagination/pagination-response";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
import { Roles } from "src/common/roles/roles.decorator";
import { PostCommentResponse } from "src/dto/response/post-comment.response";
import { PostDetailResponse } from "src/dto/response/post-detail.response";
import { RolesGuard } from "src/guard/roles.guard";
import { PostDetailService } from "src/service/post-detail.service";


@ApiTags('PostDetail')
@Controller()
@UseGuards(RolesGuard)
export class PostDetailController {
  constructor(private readonly postDetailService: PostDetailService) { }

  @ApiOperation({ summary: '포스트 상세' })
  @ApiCreatedResponse({ type: PostDetailResponse })
  @Get('post/:postId')
  async getPostDetail(@Param('postId', ParseIntPipe) postId: number): Promise<PostDetailResponse> {
    const postDetail = await this.postDetailService.getPostDetail(postId);
    return PostDetailResponse.from(postDetail);
  }
  @ApiOperation({ summary: '포스트 댓글 목록' })
  @ApiPaginatedResponse(PostCommentResponse)
  @Get('post/:postId/comment/list')
  async getPostDetailComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() paginationRequest: PaginationRequest,
    @Req() req,
  ): Promise<PaginationResponse<PostCommentResponse>> {

    const { getPostComments, totalCount } = await this.postDetailService.getPostComments(
      postId, paginationRequest, req.user.id);

    return PaginationResponse.of({
      data: PostCommentResponse.fromList(getPostComments),
      options: paginationRequest,
      totalCount,
    })

  }

  @ApiOperation({ summary: '포스트 지원하기' })
  @Post('post/:postId/apply')
  async applyPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req): Promise<void> {
    await this.postDetailService.applyPost(postId, req.user.id);

  }

  @ApiOperation({ summary: '댓글 달기' })
  @Post('post/:postId/comment/write')
  async writeComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req,
    @Body('content') content: string
  ): Promise<void> {
    await this.postDetailService.writeComment(postId, req.user.id, content);
  }

}
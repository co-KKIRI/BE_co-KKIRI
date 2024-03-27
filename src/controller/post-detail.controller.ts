import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { PaginationResponse } from "src/common/pagination/pagination-response";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
import { Roles } from "src/common/roles/roles.decorator";
import { RecruitedPostInfoDto } from "src/dto/request/post-detail/recruited-post-info";
import { PostCommentResponse } from "src/dto/response/post-comment.response";
import { PostDetailResponse } from "src/dto/response/post-detail.response";
import { RecruitPostResponse } from "src/dto/response/post-detail/recruit-post-response";
import { RolesGuard } from "src/guard/roles.guard";
import { PostDetailService } from "src/service/post-detail.service";


@ApiTags('PostDetail')
@Controller()
@UseGuards(RolesGuard)
export class PostDetailController {
  constructor(private readonly postDetailService: PostDetailService) { }

  @Roles('anyone')
  @ApiOperation({ summary: '포스트 상세' })
  @ApiCreatedResponse({ type: PostDetailResponse })
  @Get('post/:postId')
  async getPostDetail(@Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<PostDetailResponse> {
    const userId = req.user?.id;
    const postDetail = await this.postDetailService.getPostDetail(postId, userId);
    return PostDetailResponse.from(postDetail);
  }

  @Roles('anyone')
  @ApiOperation({ summary: '포스트 댓글 목록' })
  @ApiPaginatedResponse(PostCommentResponse)
  @Get('post/:postId/comment/list')
  async getPostDetailComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() paginationRequest: PaginationRequest,
    @Req() req,
  ): Promise<PaginationResponse<PostCommentResponse>> {
    const userId = req.user?.id;
    const { getPostComments, totalCount } = await this.postDetailService.getPostComments(
      postId, paginationRequest, userId);

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

  @ApiOperation({ summary: '스터디 수정' })
  @Patch('post/:postId/modify')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req,
    @Body() patchPostInfo: RecruitedPostInfoDto): Promise<void> {
    return this.postDetailService.patchPostInfo(postId, req.user.id, patchPostInfo);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @Patch('post/:postId/:commentId')
  async updateComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req,
    @Body('content') content: string,
  ): Promise<void> {
    return this.postDetailService.patchCommentInfo(postId, commentId, req.user.id, content);
  }

  @ApiOperation({ summary: '포스트 삭제' })
  @Delete('post/:postId')
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number, @Req() req): Promise<void> {
    return this.postDetailService.deletePostInfo(postId, req.user.id);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @Delete('post/:postId/:commentId')
  async deleteComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req): Promise<void> {
    return this.postDetailService.deleteCommentInfo(postId, commentId, req.user.id);
  }

  @ApiOperation({ summary: '스터디 모집' })
  @Post('post/recruit')
  async recruitPostInfo(
    @Req() req,
    @Body() recruitedPostInfo: RecruitedPostInfoDto
  ): Promise<RecruitPostResponse> {
    return this.postDetailService.recruitPost(req.user.id, recruitedPostInfo);
  }
}
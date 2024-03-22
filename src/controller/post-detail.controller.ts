import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
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
  @ApiCreatedResponse({ type: PostCommentResponse })
  @Get('post/:postId/comment/list')
  async getPostDetailComment(@Param('postId', ParseIntPipe) postId: number): Promise<PostCommentResponse> {
    const commentInfo = await this.postDetailService.getPostComments(postId);
    return PostCommentResponse.from(commentInfo);

  }

  @ApiOperation({ summary: '포스트 지원하기' })
  @Post('post/:postId/apply')
  async applyPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req): Promise<void> {
    console.log(req.user);
    await this.postDetailService.applyPost(postId, req.user.id);
    
  }

}
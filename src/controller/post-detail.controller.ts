import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiPaginatedResponse } from "src/common/pagination/pagination.decorator";
import { PostCommentResponse } from "src/dto/response/post-comment.response";
import { PostDetailResponse } from "src/dto/response/post-detail.response";
import { PostDetailService } from "src/service/post-detail.service";

@ApiTags('PostDetail')
@Controller()
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

}
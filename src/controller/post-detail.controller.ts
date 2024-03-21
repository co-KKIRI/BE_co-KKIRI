import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
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
}
import { Controller, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PostListResponse } from "src/dto/response/post-list-response";
import { PostListService } from "src/service/post-list.service";

@ApiTags('PostList')
@Controller('post')
export class PostListController {
  constructor(private readonly postListService: PostListService) { }

  @ApiOperation({ summary: '스터디 목록' })
  @ApiCreatedResponse({ type: PostListResponse })
  @Get('/list')
  async getPostList(): Promise<PostListResponse> {
    const postList = await this.postListService.getPostList();
    return PostListResponse.from(postList);
  }
}
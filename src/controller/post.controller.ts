import { Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guard/roles.guard';
import { PostService } from 'src/service/post.service';

@ApiTags('Post')
@Controller('post')
@UseGuards(RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '스크랩 추가' })
  @Post('/:postId/scrap/create')
  async postScrap(@Param('postId', ParseIntPipe) postId: number, @Req() req) {
    return this.postService.postScrap(req.user.id, postId);
  }

  @ApiOperation({ summary: '스크랩 삭제' })
  @Delete('/:postId/scrap/delete')
  async deleteScrap(@Param('postId', ParseIntPipe) postId: number, @Req() req) {
    return this.postService.deleteScrap(req.user.id, postId);
  }
}

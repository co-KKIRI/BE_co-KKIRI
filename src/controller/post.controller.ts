import { Controller, Get } from '@nestjs/common';
import { PostService } from '../service/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list')
  getAll() {
    return this.postService.getAll();
  }
}

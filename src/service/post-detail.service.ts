import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetPostDetailDto } from "src/dto/get-post-detail.dto";
import { Post } from "src/entity/post.entity";
import { PostDetailQueryRepository } from "src/repository/post-detail.query-repository";

@Injectable()
export class PostDetailService {
  constructor(@InjectRepository(Post) private readonly postDetailQueryRepository: PostDetailQueryRepository) { }

  async getPostDetail(postId: number): Promise<GetPostDetailDto> {
    const post = await this.postDetailQueryRepository.getAllPostDetails(postId);

    return new GetPostDetailDto(post);
  }
}
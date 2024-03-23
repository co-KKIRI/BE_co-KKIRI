import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetPostListDto } from "src/dto/get-post-list.dto";
import { Post } from "src/entity/post.entity";
import { PostListQueryRepository } from "src/repository/post-list.query-repository";
import { Repository } from "typeorm";

@Injectable()
export class PostListService {
  constructor(private readonly postListQueryRepository: PostListQueryRepository,
  ) { }

  async getPostList(): Promise<GetPostListDto> {
    const postListTuples = await this.postListQueryRepository.getAllPostList();
    return new GetPostListDto(postListTuples);
  }
}
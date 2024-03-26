import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { GetPostListDto, GetPostedList } from "src/dto/get-post-list.dto";
import { Post } from "src/entity/post.entity";
import { PostListQueryRepository } from "src/repository/post-list.query-repository";
import { Repository } from "typeorm";

@Injectable()
export class PostListService {
  constructor(private readonly postListQueryRepository: PostListQueryRepository,
  ) { }

  async getPostList(paginationRequest: PaginationRequest, memberId: number) {
    const postListTuples = await this.postListQueryRepository.getAllPostList(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllPostListTotalCount();
    const postInfo = postListTuples.map((postList) =>
      GetPostedList.from(postList));

    return { postInfo, totalCount };
  }
}
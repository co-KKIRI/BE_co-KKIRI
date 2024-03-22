import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetPostComment, GetPostCommentDto } from "src/dto/get-post-comment.dto";
import { GetPostDetailDto } from "src/dto/get-post-detail.dto";
import { Post } from "src/entity/post.entity";
import { PostDetailQueryRepository } from "src/repository/post-detail.query-repository";
import { Repository } from "typeorm";

@Injectable()
export class PostDetailService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly postDetailQueryRepository: PostDetailQueryRepository) { }

  async getPostDetail(postId: number): Promise<GetPostDetailDto> {
    const post = await this.postDetailQueryRepository.getAllPostDetails(postId);

    return new GetPostDetailDto(post);
  }

  async getPostComments(postId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    const postCommentTuples = await this.postDetailQueryRepository.getAllComments(postId);
    const getPostComments = postCommentTuples.map((postComment) =>
      //TODO : 유저 검증 필요
      GetPostComment.from(postComment, post.id));
    return getPostComments;
  }
}
import { PaginationRequest } from './../common/pagination/pagination-request';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetPostComment, GetPostCommentDto } from "src/dto/get-post-comment.dto";
import { GetPostDetailDto } from "src/dto/get-post-detail.dto";
import { Comment } from "src/entity/comment.entity";
import { PostApplyStatus, TeamInviteType, TeamMemberStatus } from "src/entity/common/Enums";
import { PostView } from 'src/entity/post-view.entity';
import { Post } from "src/entity/post.entity";
import { TeamMember } from "src/entity/team-member.entity";
import { GetAllPostDetailTuple, PostDetailQueryRepository } from "src/repository/post-detail.query-repository";
import { Repository } from "typeorm";

@Injectable()
export class PostDetailService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(PostView) private readonly postViewRepository: Repository<PostView>,
    private readonly postDetailQueryRepository: PostDetailQueryRepository) { }

  // async recruitPost(memberId: number, recruitPostDto: RecruitPostDto): Promise<void> {
  //   await this.postRepository.save({
  //     memberId: memberId,
  //     type:
  //   })
  // }

  async getPostDetail(postId: number, memberId: number): Promise<GetPostDetailDto> {
    const post = await this.postDetailQueryRepository.getAllPostDetails(postId);
    const newViewCount = post.viewCount + 1;
    await this.postDetailQueryRepository.updateView(postId, newViewCount);

    await this.postViewRepository.save({
      postId: postId,
      memberId: memberId,
    });
    return new GetPostDetailDto({ ...post, viewCount: newViewCount }, await this.getPostApplyType(postId, memberId));
  }

  async getPostComments(postId: number, paginationRequest: PaginationRequest, memberId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    const totalCount = await this.postDetailQueryRepository.getAllCommentsTotalCount(postId);
    const postCommentTuples = await this.postDetailQueryRepository.getAllComments(postId, paginationRequest);

    const getPostComments = postCommentTuples.map((postComment) =>
      GetPostComment.from(postComment, memberId));
    return { getPostComments, totalCount };
  }

  async applyPost(postId: number, memberId: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    const isAlreadyTeamMember = await this.teamMemberRepository.findOneBy({
      postId: postId, memberId: memberId
    });

    if (isAlreadyTeamMember !== null) {
      throw new ConflictException('해당 포스트에 이미 존재하는 유저입니다.');
    }

    await this.teamMemberRepository.save({
      postId: postId,
      memberId: memberId,
      status: TeamMemberStatus.READY,
    })
  }

  async writeComment(postId: number, memberId: number, content: string): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }

    await this.commentRepository.save({
      postId: postId,
      memberId: memberId,
      content: content,
    })
    post.commentCount += 1;
    await this.postRepository.save(post);
  }

  private async getPostApplyType(postId: number, memberId: number): Promise<PostApplyStatus> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if(post === null ){
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    if (memberId === post?.memberId){
      return PostApplyStatus.OWNER
    };

    const teamMember = await this.teamMemberRepository.findOneBy({ postId, memberId });
    if (!teamMember) {
      return PostApplyStatus.NOT_APPLIED;
    }
    else {
      if (teamMember.inviteType === TeamInviteType.SELF) {
        return PostApplyStatus.APPLIED;
      }
      else {
        return PostApplyStatus.INVITED;
      }
    }

  }
} 
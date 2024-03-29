import { PaginationRequest } from './../common/pagination/pagination-request';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetPostComment, GetPostCommentDto } from "src/dto/get-post-comment.dto";
import { GetPostDetailDto } from "src/dto/get-post-detail.dto";
import { RecruitedPostInfoDto } from 'src/dto/request/post-detail/recruited-post-info';
import { RecruitPostResponse } from 'src/dto/response/post-detail/recruit-post-response';
import { Comment } from "src/entity/comment.entity";
import { PostApplyStatus, PostStatus, TeamInviteType, TeamMemberStatus } from "src/entity/common/Enums";
import { Member } from 'src/entity/member.entity';
import { PostScrap } from 'src/entity/post-scrap.entity';
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
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(PostScrap) private readonly postScrapRepository: Repository<PostScrap>,
    private readonly postDetailQueryRepository: PostDetailQueryRepository) { }

  async getPostDetail(postId: number, memberId?: number): Promise<GetPostDetailDto> {
    const post = await this.postDetailQueryRepository.getAllPostDetails(postId, memberId);

    const newViewCount = post.viewCount + 1;
    await this.postDetailQueryRepository.updateView(postId, newViewCount);

    if (typeof memberId !== 'undefined') {
      await this.postViewRepository.save({
        postId: postId,
        memberId: memberId,
      });
    }
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

  async patchPostInfo(postId: number, memberId: number, originPostInfo: RecruitedPostInfoDto): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }

    if (post.memberId !== memberId) {
      throw new UnauthorizedException('해당 포스트를 작성한 사용자가 아닙니다.');
    }
    post.setPostInfo(
      originPostInfo.type,
      originPostInfo.recruitEndAt,
      originPostInfo.progressPeriod,
      originPostInfo.capacity,
      originPostInfo.contactWay,
      originPostInfo.progressWay,
      JSON.stringify(originPostInfo.stacks ?? []),
      JSON.stringify(originPostInfo.positions ?? []),
      originPostInfo.title,
      originPostInfo.content,
      originPostInfo.link,
    )

    await this.postRepository.save(post);
  }

  async patchCommentInfo(
    postId: number,
    commentId: number,
    memberId: number,
    content: string
  ): Promise<void> {
    const commentInfo = await this.commentRepository.findOneBy({ id: commentId, postId });
    if (commentInfo === null) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }
    if (commentInfo.memberId !== memberId) {
      throw new UnauthorizedException('해당 댓글을 작성한 사용자가 아닙니다.');
    }

    commentInfo.setCommentInfo(content);
    await this.commentRepository.save(commentInfo);
  }

  async deletePostInfo(postId: number, memberId: number): Promise<void> {
    const postInfo = await this.postRepository.findOneBy({ id: postId });
    if (postInfo === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    if (postInfo.memberId !== memberId) {
      throw new UnauthorizedException('해당 포스트를 작성한 사용자가 아닙니다.');
    }

    postInfo.deletePostInfo(new Date());
    await this.postRepository.save(postInfo);
  }

  async deleteCommentInfo(postId: number, commentId: number, memberId: number): Promise<void> {
    const commentInfo = await this.commentRepository.findOneBy({ id: commentId, postId: postId });
    if (commentInfo === null) {
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');
    }
    if (commentInfo.memberId !== memberId) {
      throw new UnauthorizedException('해당 댓글을 작성한 사용자가 아닙니다.');
    }

    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    post.commentCount -= 1;
    await this.postRepository.save(post);

    await this.commentRepository.remove(commentInfo);
  }

  async cancelApplicationInfo(postId: number, memberId: number): Promise<void> {
    const applicationInfo = await this.teamMemberRepository.findOneBy({ postId, memberId, status: TeamMemberStatus.READY });
    if (applicationInfo === null) {
      throw new NotFoundException('해당 지원글을 찾을 수 없습니다.');
    }
    await this.teamMemberRepository.remove(applicationInfo);
  }



  async recruitPost(memberId: number, dto: RecruitedPostInfoDto): Promise<RecruitPostResponse> {
    const memberInfo = await this.memberRepository.findOneBy({ id: memberId });
    if (memberInfo === null) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const savedPost = await this.postRepository.save({
      type: dto.type,
      memberId: memberId,
      status: PostStatus.READY,
      recruitEndAt: dto.recruitEndAt,
      progressPeriod: dto.progressPeriod,
      capacity: dto.capacity,
      contactWay: dto.contactWay,
      progressWay: dto.progressWay,
      stack: JSON.stringify(dto.stacks ?? []),
      position: JSON.stringify(dto.positions ?? []),
      link: dto.link,
      title: dto.title,
      content: dto.content
    })
    return new RecruitPostResponse(savedPost.id);
  }

  private async getPostApplyType(postId: number, memberId?: number): Promise<PostApplyStatus> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    if (post.status !== PostStatus.READY) {
      return PostApplyStatus.RECRUIT_CLOSED;
    }

    if (memberId === post?.memberId) {
      return PostApplyStatus.OWNER
    };

    const teamMember = await this.teamMemberRepository.findOneBy({ postId, memberId });
    if (!teamMember || !memberId) {
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
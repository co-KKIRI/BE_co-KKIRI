import { PaginationRequest } from './../common/pagination/pagination-request';
import { ConflictException, GoneException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
import { TeamInvite } from 'src/entity/team-invite.entity';
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
    @InjectRepository(TeamInvite) private readonly teamInviteRepository: Repository<TeamInvite>,
    private readonly postDetailQueryRepository: PostDetailQueryRepository) { }

  async getPostDetail(postId: number, memberId?: number): Promise<GetPostDetailDto> {
    const isDeletedPost = await this.postRepository.findOneBy({ id: postId });
    if (isDeletedPost === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    if (isDeletedPost.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
    }

    const post = await this.postDetailQueryRepository.getAllPostDetails(postId, memberId);

    if (post.deletedAt) {
      throw new GoneException('해당 포스트의 작성자가 존재하지 않습니다.');
    }
    return new GetPostDetailDto(post, await this.getPostApplyType(postId, memberId));
  }

  async getPostComments(postId: number, paginationRequest: PaginationRequest, memberId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
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
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
    }
    const isDeletedLeader = await this.memberRepository.findOneBy({ id: memberId });

    if (isDeletedLeader === null) {
      throw new NotFoundException('해당 멤버를 찾을 수 없습니다.');
    }
    if (!isDeletedLeader.deletedAt) {
      throw new GoneException('해당 글 작성자가 존재하지 않습니다.');
    }
    const isAlreadyTeamMember = await this.teamMemberRepository.findOneBy({
      postId: postId, memberId: memberId
    });

    if (isAlreadyTeamMember !== null && isAlreadyTeamMember.status !== TeamMemberStatus.REJECT) {
      throw new ConflictException('해당 포스트에 이미 존재하는 유저입니다.');
    }

    const teamMember = await this.teamMemberRepository.findOneBy({ postId, memberId, status: TeamMemberStatus.REJECT });
    if (teamMember) {
      teamMember.status = TeamMemberStatus.READY;
      await this.teamMemberRepository.save(teamMember);
    }
    else {
      await this.teamMemberRepository.save({
        postId: postId,
        memberId: memberId,
        status: TeamMemberStatus.READY,
        inviteType: TeamInviteType.SELF
      })
    }
  }

  async writeComment(postId: number, memberId: number, content: string): Promise<void> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
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
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
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

    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
    }

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
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
    }
    post.commentCount -= 1;
    await this.postRepository.save(post);

    await this.commentRepository.remove(commentInfo);
  }

  async cancelApplicationInfo(postId: number, memberId: number): Promise<void> {
    const applicationInfo = await this.teamMemberRepository.findOneBy({ postId, memberId });
    if (applicationInfo === null) {
      throw new NotFoundException('해당 지원글을 찾을 수 없습니다.');
    }
    const teamInviteId = applicationInfo.teamInviteId
    if (applicationInfo.inviteType === TeamInviteType.OTHERS && teamInviteId !== null) {
      const teamInviteInfo = await this.teamInviteRepository.findOneBy({ id: teamInviteId });

      if (teamInviteInfo) {
        await this.teamInviteRepository.remove(teamInviteInfo);
      }
    }
    await this.teamMemberRepository.remove(applicationInfo);
  }

  async increaseViewCountInfo(postId: number, memberId?: number): Promise<void> {
    const postInfo = await this.postRepository.findOneBy({ id: postId });
    if (postInfo === null) {
      throw new NotFoundException('해당 지원글을 찾을 수 없습니다.');
    }
    if (postInfo.deletedAt) {
      throw new GoneException('해당 포스트는 삭제되었습니다.')
    }
    if (memberId) {
      await this.postViewRepository.save({
        postId,
        memberId,
      })
    }
    postInfo.viewCount += 1;
    await this.postRepository.save(postInfo);
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
    if (post.deletedAt !== null) {
      throw new GoneException('해당 포스트는 삭제되었습니다.');
    }

    if (memberId === post?.memberId) {
      return PostApplyStatus.OWNER
    };

    if (post.status !== PostStatus.READY) {
      return PostApplyStatus.RECRUIT_CLOSED;
    }

    const teamMember = await this.teamMemberRepository.findOneBy({ postId, memberId });
    if (
      !teamMember || !memberId
      || (teamMember && teamMember.status === TeamMemberStatus.REJECT)) {
      return PostApplyStatus.NOT_APPLIED;
    }
    else {
      if (teamMember.inviteType === TeamInviteType.SELF ||
        (teamMember.inviteType === TeamInviteType.OTHERS && teamMember.status === TeamMemberStatus.ACCEPT)) {
        return PostApplyStatus.APPLIED;
      }
      else {
        return PostApplyStatus.INVITED;
      }
    }

  }
} 
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { GetPostManagementDto } from '../dto/get-post-management.dto';
import { GetAppliedPostMember } from '../dto/get-post-apply.dto';
import { TeamMemberQueryRepository } from '../repository/team-member.query-repository';
import { PostStatus, TeamInviteType, TeamMemberStatus } from '../entity/common/Enums';
import { PaginationRequest } from '../common/pagination/pagination-request';

@Injectable()
export class PostManagementService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly teamMemberQueryRepository: TeamMemberQueryRepository,
  ) {}

  async getPostManagement(postId: number, memberId: number): Promise<GetPostManagementDto> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    const isLeader = post.memberId == memberId;

    return new GetPostManagementDto({ post, isLeader: isLeader });
  }

  async getPostApply(postId: number, paginationRequest: PaginationRequest) {
    const teamMembersTuples = await this.teamMemberQueryRepository.getAllTeamMembers(
      postId,
      TeamMemberStatus.READY,
      paginationRequest,
      TeamInviteType.SELF,
    );
    const totalCount = await this.teamMemberQueryRepository.getAllTeamMembersTotalCount(postId, TeamMemberStatus.READY);

    const getAppliedPostMembers = teamMembersTuples.map((teamMember) => GetAppliedPostMember.from(teamMember));
    return { getAppliedPostMembers, totalCount };
  }

  async start(postId: number, memberId: number): Promise<void> {
    const post = await this.getPost(postId);
    this.checkLeaderMember(post, memberId);
    if (!post.isModifiableStart()) {
      throw new BadRequestException('시작이 불가능한 상태입니다.');
    }

    if (post.status) post.setStatus(PostStatus.PROGRESS);
    await this.postRepository.save(post);
  }

  async end(postId: number, memberId: number): Promise<void> {
    const post = await this.getPost(postId);
    this.checkLeaderMember(post, memberId);
    if (!post.isModifiableEnd()) {
      throw new BadRequestException('완료가 불가능한 상태입니다.');
    }

    if (post.status) post.setStatus(PostStatus.PROGRESS_END);
    await this.postRepository.save(post);
  }

  async reviewEnd(postId: number, memberId: number): Promise<void> {
    const post = await this.getPost(postId);
    this.checkLeaderMember(post, memberId);
    if (!post.isModifiableReviewEnd()) {
      throw new BadRequestException('리뷰 마감이 불가능한 상태입니다.');
    }

    if (post.status) post.setStatus(PostStatus.DONE);
    await this.postRepository.save(post);
  }

  private async getPost(postId: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    return post;
  }

  private checkLeaderMember(post: Post, memberId: number): void {
    if (post.memberId !== memberId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
  }
}

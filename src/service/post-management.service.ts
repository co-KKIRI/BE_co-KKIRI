import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { GetPostManagementDto } from '../dto/get-post-management.dto';
import { GetAppliedPostMember } from '../dto/get-post-apply.dto';
import { TeamMemberQueryRepository } from '../repository/team-member.query-repository';
import { PostStatus, TeamMemberStatus } from '../entity/common/Enums';
import { PaginationRequest } from '../common/pagination/pagination-request';

@Injectable()
export class PostManagementService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly teamMemberQueryRepository: TeamMemberQueryRepository,
  ) {}

  async getPostManagement(postId: number): Promise<GetPostManagementDto> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    // TODO: 유저 인증 정보와 비교하여 리더 여부 확인해야함
    const currentMemberId = post.memberId;
    const isLeader = post.memberId == currentMemberId;

    return new GetPostManagementDto({ post, isLeader: isLeader });
  }

  async getPostApply(postId: number, paginationRequest: PaginationRequest) {
    const teamMembersTuples = await this.teamMemberQueryRepository.getAllTeamMembers(
      postId,
      TeamMemberStatus.READY,
      paginationRequest,
    );
    const totalCount = await this.teamMemberQueryRepository.getAllTeamMembersTotalCount(postId, TeamMemberStatus.READY);

    const getAppliedPostMembers = teamMembersTuples.map((teamMember) => GetAppliedPostMember.from(teamMember));
    return { getAppliedPostMembers, totalCount };
  }

  async start(postId: number): Promise<void> {
    const post = await this.getPost(postId);
    if (!post.isModifiableStart()) {
      throw new BadRequestException('시작이 불가능한 상태입니다.');
    }

    if (post.status) post.setStatus(PostStatus.PROGRESS);
    await this.postRepository.save(post);
  }

  async end(postId: number): Promise<void> {
    const post = await this.getPost(postId);
    if (!post.isModifiableEnd()) {
      throw new BadRequestException('완료가 불가능한 상태입니다.');
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
}

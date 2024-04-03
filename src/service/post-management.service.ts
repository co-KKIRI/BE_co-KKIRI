import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { GetPostManagementDto } from '../dto/get-post-management.dto';
import { GetAppliedPostMember } from '../dto/get-post-apply.dto';
import { TeamMemberQueryRepository } from '../repository/team-member.query-repository';
import { PostStatus, TeamInviteType, TeamMemberStatus } from '../entity/common/Enums';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { MemberReview } from '../entity/member-review.entity';
import { Member } from '../entity/member.entity';
import { TeamMember } from '../entity/team-member.entity';
import { ReviewScoreCalculator } from '../calculator/review-score.calculator';
import { PostReview } from 'src/entity/post-review.entity';
import { GetInvitedPostMember } from '../dto/get-post-invite.dto';
import { PostCountQueryRepository } from '../repository/post-count.query-repository';

@Injectable()
export class PostManagementService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(MemberReview) private readonly memberReviewRepository: Repository<MemberReview>,
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(PostReview) private readonly postReviewRepository: Repository<PostReview>,
    private readonly teamMemberQueryRepository: TeamMemberQueryRepository,
    private readonly postCountQueryRepository: PostCountQueryRepository,
  ) {}

  async getPostManagement(postId: number, memberId: number): Promise<GetPostManagementDto> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    const review = await this.postReviewRepository.findOneBy({ postId, memberId });

    const isLeader = post.memberId == memberId;
    const isReviewed = review !== null;
    return new GetPostManagementDto({ post, isLeader: isLeader, isReviewed: isReviewed });
  }

  async getPostApply(postId: number, paginationRequest: PaginationRequest) {
    const teamMembersTuples = await this.teamMemberQueryRepository.getAllTeamMembers(
      postId,
      TeamMemberStatus.READY,
      paginationRequest,
      TeamInviteType.SELF,
    );
    const totalCount = await this.teamMemberQueryRepository.getAllTeamMembersTotalCount(
      postId,
      TeamMemberStatus.READY,
      TeamInviteType.SELF,
    );

    const getAppliedPostMembers = teamMembersTuples.map((teamMember) => GetAppliedPostMember.from(teamMember));
    return { getAppliedPostMembers, totalCount };
  }

  async getPostInvite(postId: number, paginationRequest: PaginationRequest) {
    const teamMembersTuples = await this.teamMemberQueryRepository.getAllTeamMembers(
      postId,
      TeamMemberStatus.READY,
      paginationRequest,
      TeamInviteType.OTHERS,
    );
    const totalCount = await this.teamMemberQueryRepository.getAllTeamMembersTotalCount(
      postId,
      TeamMemberStatus.READY,
      TeamInviteType.OTHERS,
    );

    const getInvitedPostMembers = teamMembersTuples.map((teamMember) => GetInvitedPostMember.from(teamMember));
    return { getInvitedPostMembers, totalCount };
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

    await this.review(postId);
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

  private async review(postId: number) {
    const memberReviewList = await this.memberReviewRepository.findBy({ postId: postId });
    const teamMemberList = await this.teamMemberRepository.findBy({ postId: postId });

    for (const teamMember of teamMemberList) {
      const member = await this.memberRepository.findOneBy({ id: teamMember.memberId });
      if (member === null) {
        continue;
      }

      const donePostCount = await this.postCountQueryRepository.getCountDonePostForReview(member.id);
      const reviewScoreCalculator = new ReviewScoreCalculator(memberReviewList, donePostCount);
      member.review(reviewScoreCalculator.calculateMyScore(member.id));
      await this.memberRepository.save(member);
    }
  }
}

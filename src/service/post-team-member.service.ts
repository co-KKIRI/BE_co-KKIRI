import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { TeamInviteType, TeamMemberStatus } from '../entity/common/Enums';
import { TeamMemberQueryRepository } from '../repository/team-member.query-repository';
import { GetPostTeamMember } from '../dto/get-post-team-member.dto';
import { Post } from '../entity/post.entity';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { Member } from '../entity/member.entity';
import { PostReview } from '../entity/post-review.entity';
import { TeamInvite } from 'src/entity/team-invite.entity';

@Injectable()
export class PostTeamMemberService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    @InjectRepository(PostReview) private readonly postReviewRepository: Repository<PostReview>,
    @InjectRepository(TeamInvite) private readonly teamInviteRepository: Repository<TeamInvite>,
    private readonly teamMemberQueryRepository: TeamMemberQueryRepository,
  ) { }

  async acceptTeamMember(teamMemberId: number): Promise<void> {
    const teamMember = await this.getTeamMember(teamMemberId);

    this.checkModifiableTeamMember(teamMember);

    teamMember.setStatus(TeamMemberStatus.ACCEPT);
    await this.teamMemberRepository.save(teamMember);
  }

  async rejectTeamMember(teamMemberId: number): Promise<void> {
    const teamMember = await this.getTeamMember(teamMemberId);

    this.checkModifiableTeamMember(teamMember);

    teamMember.setStatus(TeamMemberStatus.REJECT);
    await this.teamMemberRepository.save(teamMember);
  }

  private async getTeamMember(teamMemberId: number): Promise<TeamMember> {
    const teamMember = await this.teamMemberRepository.findOneBy({ id: teamMemberId });
    if (teamMember === null) {
      throw new NotFoundException('해당 신청을 찾을 수 없습니다.');
    }
    return teamMember;
  }

  private checkModifiableTeamMember(teamMember: TeamMember): void {
    if (teamMember.status === TeamMemberStatus.ACCEPT) {
      throw new BadRequestException('이미 수락된 신청입니다.');
    }
    if (teamMember.status === TeamMemberStatus.REJECT) {
      throw new BadRequestException('이미 거절된 신청입니다.');
    }
  }

  async getAllPostTeamMember(postId: number, paginationRequest: PaginationRequest) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    const leaderMember = await this.memberRepository.findOneBy({ id: post.memberId });
    if (leaderMember === null) {
      throw new NotFoundException('리더를 찾을 수 없습니다.');
    }

    const teamMembersTuples = await this.teamMemberQueryRepository.getAllTeamMembers(
      postId,
      TeamMemberStatus.ACCEPT,
      paginationRequest,
    );
    const totalCount = await this.teamMemberQueryRepository.getAllTeamMembersTotalCount(
      postId,
      TeamMemberStatus.ACCEPT,
    );
    const leaderPostReview = await this.postReviewRepository.findOneBy({ postId, memberId: leaderMember.id });

    const getPostTeamMembers = teamMembersTuples.map((teamMember) => GetPostTeamMember.from(teamMember));
    const leaderTeamMember = GetPostTeamMember.fromLeader(leaderMember, leaderPostReview?.id);

    return { getPostTeamMembers: [...getPostTeamMembers, leaderTeamMember], totalCount };
  }

  async deleteTeamMember(teamMemberId: number): Promise<void> {
    const teamMember = await this.teamMemberRepository.findOneBy({ id: teamMemberId, status: TeamMemberStatus.ACCEPT });
    if (teamMember === null) {
      throw new NotFoundException('해당 팀원을 찾을 수 없습니다.');
    }

    if (teamMember.teamInviteId) {
      const teamInvitation = await this.teamInviteRepository.findOneBy({ id: teamMember.teamInviteId });
      if (teamInvitation) {
        await this.teamInviteRepository.remove(teamInvitation);
      }
    }

    teamMember.setDeletedUserStatus(TeamMemberStatus.READY, TeamInviteType.SELF);
    await this.teamMemberRepository.save(teamMember);


  }
}

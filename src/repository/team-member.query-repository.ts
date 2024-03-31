import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TeamMemberStatus } from '../entity/common/Enums';
import { Member } from '../entity/member.entity';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { PostReview } from '../entity/post-review.entity';

@Injectable()
export class TeamMemberQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getAllTeamMembers(
    postId: number,
    status: TeamMemberStatus,
    paginationRequest: PaginationRequest,
  ): Promise<GetAllTeamMembersTuple[]> {
    const teamMembers = await this.getBaseQuery(postId, status)
      .select([
        'team_member.id as teamMemberId',
        'team_member.memberId as memberId',
        'member.nickname as nickname',
        'member.position as position',
        'member.profileImageUrl as profileImageUrl',
        'post_review.id as postReviewId',
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('team_member.updatedAt', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllTeamMembersTuple, teamMembers);
  }

  async getAllTeamMembersTotalCount(postId: number, status: TeamMemberStatus): Promise<number> {
    return await this.getBaseQuery(postId, status).getCount();
  }

  private getBaseQuery(postId: number, status: TeamMemberStatus) {
    return this.dataSource
      .createQueryBuilder()
      .from(TeamMember, 'team_member')
      .innerJoin(Member, 'member', 'team_member.memberId = member.id')
      .leftJoin(
        PostReview,
        'post_review',
        'team_member.memberId = post_review.memberId AND team_member.postId = post_review.postId',
      )
      .where('team_member.postId = :postId', { postId })
      .andWhere('team_member.status = :status', { status });
  }
}

export class GetAllTeamMembersTuple {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  position?: string;
  profileImageUrl?: string;
  postReviewId?: number;
}

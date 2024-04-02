import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TeamInviteType, TeamMemberStatus } from '../entity/common/Enums';
import { Member } from '../entity/member.entity';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { PostReview } from '../entity/post-review.entity';

@Injectable()
export class TeamMemberQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getAllTeamMembers(
    postId: number,
    status: TeamMemberStatus,
    paginationRequest: PaginationRequest,
    inviteType?: TeamInviteType,
  ): Promise<GetAllTeamMembersTuple[]> {
    const teamMembers = await this.getBaseQuery(postId, status, inviteType)
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

  async getAllTeamMembersTotalCount(
    postId: number,
    status: TeamMemberStatus,
    inviteType?: TeamInviteType,
  ): Promise<number> {
    return await this.getBaseQuery(postId, status, inviteType).getCount();
  }

  private getBaseQuery(postId: number, status: TeamMemberStatus, inviteType?: TeamInviteType) {
    const query = this.dataSource
      .createQueryBuilder()
      .from(TeamMember, 'team_member')
      .innerJoin(Member, 'member', 'team_member.memberId = member.id')
      .leftJoin(
        PostReview,
        'post_review',
        'team_member.memberId = post_review.memberId AND team_member.postId = post_review.postId',
      )
      .where('team_member.postId = :postId', { postId })
      .andWhere('team_member.status = :status', { status })
      .andWhere('member.deletedAt is NULL');

    if (inviteType) {
      query.andWhere('team_member.inviteType = :inviteType', { inviteType });
    }

    return query;
  }

  async getReviewMember(postId: number, memberId: number): Promise<GetReviewMemberTuple[]> {
    const reviewMemberList = await this.dataSource
      .createQueryBuilder()
      .from(TeamMember, 'team_member')
      .innerJoin(Member, 'member', 'team_member.memberId = member.id')
      .where('team_member.postId = :postId', { postId })
      .andWhere('team_member.memberId != :memberId', { memberId })
      .andWhere('team_member.status = :status', { status: TeamMemberStatus.ACCEPT })
      .andWhere('member.deletedAt IS NULL')
      .select([
        'team_member.memberId as memberId',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'member.position as position'
      ])
      .getRawMany();

    return plainToInstance(GetReviewMemberTuple, reviewMemberList);
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

export class GetReviewMemberTuple {
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
}

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TeamMemberStatus } from '../entity/common/Enums';
import { Member } from '../entity/member.entity';
import { PaginationRequest } from '../common/pagination/pagination-request';

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
        'member.profileImageUrl as profileImageUrl',
      ])
      .skip(paginationRequest.skip)
      .take(paginationRequest.take)
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
      .where('team_member.postId = :postId', { postId })
      .andWhere('team_member.status = :status', { status });
  }
}

export class GetAllTeamMembersTuple {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;
}

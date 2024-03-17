import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TeamMemberStatus } from '../entity/common/Enums';
import { Member } from '../entity/member.entity';

@Injectable()
export class TeamMemberQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getAllReadyTeamMembers(postId: number) {
    const teamMembers = await this.dataSource
      .createQueryBuilder()
      .from(TeamMember, 'team_member')
      .innerJoin(Member, 'member', 'team_member.memberId = member.id')
      .where('team_member.postId = :postId', { postId })
      .andWhere('team_member.status = :status', { status: TeamMemberStatus.READY })
      .select([
        'team_member.id as teamMemberId',
        'team_member.memberId as memberId',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
      ])
      .getRawMany();
    return plainToInstance(GetAllReadyTeamMembersTuple, teamMembers);
  }
}

export class GetAllReadyTeamMembersTuple {
  teamMemberId!: number;
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;
}

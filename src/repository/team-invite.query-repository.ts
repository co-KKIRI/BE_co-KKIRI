import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TeamMemberStatus } from '../entity/common/Enums';
import { Member } from '../entity/member.entity';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { TeamInvite } from 'src/entity/team-invite.entity';
import { Post } from 'src/entity/post.entity';

@Injectable()
export class TeamInviteQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getTeamInviteInfo(memberId: number, teamInviteId: number): Promise<GetTeamInviteInfoTuple> {
    const teamInviteInfo = await this.dataSource
      .createQueryBuilder()
      .select([
        'm.id as sendMemberId',
        'm.nickname as sendMemberNickname',
        'p.id as postId',
        'p.title as postTitle',
        'ti.message as message',
      ])
      .from(TeamInvite, 'ti')
      .innerJoin(TeamMember, 'tm', 'ti.id = tm.teamInviteId')
      .innerJoin(Member, 'm', 'ti.sendMemberId = m.id')
      .innerJoin(Post, 'p', 'tm.postId = p.id')
      .where('tm.memberId = :memberId', { memberId })
      .andWhere('ti.id = :teamInviteId', { teamInviteId })
      .getRawOne();

    return plainToInstance(GetTeamInviteInfoTuple, teamInviteInfo);
  }

  // async getAllTeamMembers(
  //   postId: number,
  //   status: TeamMemberStatus,
  //   paginationRequest: PaginationRequest,
  // ): Promise<GetAllTeamMembersTuple[]> {
  //   const teamMembers = await this.getBaseQuery(postId, status)
  //     .select([
  //       'team_member.id as teamMemberId',
  //       'team_member.memberId as memberId',
  //       'member.nickname as nickname',
  //       'member.position as position',
  //       'member.profileImageUrl as profileImageUrl',
  //     ])
  //     .limit(paginationRequest.take)
  //     .offset(paginationRequest.getSkip())
  //     .orderBy('team_member.updatedAt', paginationRequest.order)
  //     .getRawMany();
  //   return plainToInstance(GetAllTeamMembersTuple, teamMembers);
  // }

  // async getAllTeamMembersTotalCount(postId: number, status: TeamMemberStatus): Promise<number> {
  //   return await this.getBaseQuery(postId, status).getCount();
  // }

  // private getBaseQuery(postId: number, status: TeamMemberStatus) {
  //   return this.dataSource
  //     .createQueryBuilder()
  //     .from(TeamMember, 'team_member')
  //     .innerJoin(Member, 'member', 'team_member.memberId = member.id')
  //     .where('team_member.postId = :postId', { postId })
  //     .andWhere('team_member.status = :status', { status });
  // }
}

// export class GetAllTeamMembersTuple {
//   teamMemberId!: number;
//   memberId!: number;
//   nickname?: string;
//   position?: string;
//   profileImageUrl?: string;
// }

export class GetTeamInviteInfoTuple {
  sendMemberId: number;
  sendMemberNickname: string;
  postId: string;
  postTitle: string;
  message: string;
}

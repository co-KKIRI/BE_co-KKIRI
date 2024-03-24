import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from '../entity/member.entity';
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
        'tm.id as teamMemberId',
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
}

export class GetTeamInviteInfoTuple {
  sendMemberId: number;
  sendMemberNickname: string;
  postId: string;
  postTitle: string;
  message: string;
  teamMemberId: number;
}

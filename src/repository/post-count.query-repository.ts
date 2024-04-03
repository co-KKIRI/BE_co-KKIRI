import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Post } from '../entity/post.entity';
import { TeamMember } from '../entity/team-member.entity';
import { PostStatus, TeamMemberStatus } from '../entity/common/Enums';

@Injectable()
export class PostCountQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getCountDonePostForReview(memberId: number): Promise<number> {
    return await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(TeamMember, 'team_member', 'post.id = team_member.postId')
      .where('post.status = :status', { status: PostStatus.DONE })
      .andWhere('team_member.status = :status', { status: TeamMemberStatus.ACCEPT })
      .andWhere('team_member.memberId = :memberId', { memberId })
      .getCount();
  }
}

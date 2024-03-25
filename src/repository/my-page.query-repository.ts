import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Transform, plainToInstance } from 'class-transformer';
import { PaginationRequest } from 'src/common/pagination/pagination-request';
import { TeamInviteType, TeamMemberStatus, Type } from 'src/entity/common/Enums';
import { Member } from 'src/entity/member.entity';
import { PostScrap } from 'src/entity/post-scrap.entity';
import { Post } from 'src/entity/post.entity';
import { TeamInvite } from 'src/entity/team-invite.entity';
import { TeamMember } from 'src/entity/team-member.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MyPageQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getMyPageInfo(id: number) {
    const mypageInfo = await this.dataSource
      .createQueryBuilder()
      .from(Member, 'member')
      .where('member.id = :id', { id })
      .select([
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'member.position as position',
        'member.career as career',
        'member.introduce as introduce',
        'member.stack as stack',
        'member.link as link',
      ])
      .getRawOne();

    return plainToInstance(GetMyPageInfoTuple, mypageInfo);
  }

  async getMyPageScrap(id: number, paginationRequest: PaginationRequest): Promise<GetMyPageScrapTuple[]> {
    const myPageScrap = await this.getMyPageScrapBaseQuery(id)
      .select([
        'p.id as postId',
        'p.type as type',
        'p.recruit_end_at as recruitEndAt',
        'p.progress_way as progressWay',
        'p.title as title',
        'p.position as position',
        'p.stack as stack',
        'm.nickname as memberNickname',
        'm.profile_image_url as memberProfileImageUrl',
        'p.view_count as viewCount',
        'p.comment_count as commentCount',
        'true as isScraped',
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('ps.created_at', paginationRequest.order)
      .getRawMany();

    return plainToInstance(GetMyPageScrapTuple, myPageScrap);
  }

  async getMyPageScrapCount(id: number): Promise<number> {
    return await this.getMyPageScrapBaseQuery(id).getCount();
  }

  private getMyPageScrapBaseQuery(id: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(PostScrap, 'ps')
      .innerJoin(Post, 'p', 'ps.postId = p.id')
      .innerJoin(Member, 'm', 'p.memberId = m.id')
      .where('ps.memberId = :id', { id });
  }

  async getMyPageInviteList(id: number, paginationRequest: PaginationRequest) {
    const myPageInviteList = await this.getMyPageInviteListBaseQuery(id)
      .select(['p.id as postId', 'ti.id as teamInviteId', 'p.title as title'])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('p.created_at', paginationRequest.order)
      .getRawMany();

    return plainToInstance(GetMyPageInviteTuple, myPageInviteList);
  }

  async getMyPageInviteCount(id: number): Promise<number> {
    return await this.getMyPageInviteListBaseQuery(id).getCount();
  }

  private getMyPageInviteListBaseQuery(id: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(TeamMember, 'tm')
      .innerJoin(Post, 'p', 'tm.post_id = p.id')
      .innerJoin(TeamInvite, 'ti', 'tm.team_invite_id = ti.id')
      .where('tm.memberId = :id', { id })
      .andWhere('tm.status = :status', { status: TeamMemberStatus.READY })
      .andWhere('tm.invite_type = :inviteType', { inviteType: TeamInviteType.OTHERS });
  }

  async getMyPageVisibleProfile(id: number): Promise<GetMyPageVisibleProfileTuple> {
    const isVisibleProfile = await this.dataSource
      .createQueryBuilder()
      .from(Member, 'member')
      .where('member.id = :id', { id })
      .select(['member.is_visible_profile as isVisibleProflie'])
      .getRawOne();

    return plainToInstance(GetMyPageVisibleProfileTuple, isVisibleProfile);
  }
}

export class GetMyPageInfoTuple {
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
  career?: number;
  introduce?: string;
  stack?: string;
  link?: string;
}

export class GetMyPageScrapTuple {
  postId: number;
  type: Type;
  recruitEndAt?: string;
  progressWay?: string;
  title?: string;
  position?: string;
  stack?: string;
  memberNickname?: string;
  memberProfileImageUrl?: string;
  viewCount?: number;
  commentCount?: number;
  @Transform(({ value }) => Boolean(value))
  isScraped?: boolean;
}

export class GetMyPageInviteTuple {
  postId: number;
  teamInviteId: number;
  title: string;
}

export class GetMyPageVisibleProfileTuple {
  @Transform(({ value }) => Boolean(value))
  isVisibleProflie: boolean;
}

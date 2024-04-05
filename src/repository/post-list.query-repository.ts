import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Transform, plainToInstance } from "class-transformer";
import { IsInt } from "class-validator";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { Comment } from "src/entity/comment.entity";
import { PostListSortBy, PostListType, PostStatus, TeamInviteType, TeamMemberStatus, Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { PostReview } from "src/entity/post-review.entity";
import { PostScrap } from "src/entity/post-scrap.entity";
import { PostView } from "src/entity/post-view.entity";
import { Post } from "src/entity/post.entity";
import { TeamMember } from "src/entity/team-member.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostListQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getMainStudyLatestList(memberId: number): Promise<GetAllPostListTuple[]> {
    const mainPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.type = :type', { type: Type.STUDY })
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(4)
      .orderBy('post.createdAt', 'DESC')
      .addOrderBy('post.scrapCount', 'DESC')
      .getRawMany()
    return plainToInstance(GetAllPostListTuple, mainPostInfo);
  }

  async getMainStudyHottestList(memberId: number): Promise<GetAllPostListTuple[]> {
    const mainPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.type = :type', { type: Type.STUDY })
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(4)
      .orderBy('post.viewCount', 'DESC')
      .getRawMany()
    return plainToInstance(GetAllPostListTuple, mainPostInfo);
  }

  async getMainProjectLatestList(memberId: number): Promise<GetAllPostListTuple[]> {
    const mainPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.type = :type', { type: Type.PROJECT })
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(4)
      .orderBy('post.createdAt', 'DESC')
      .getRawMany()
    return plainToInstance(GetAllPostListTuple, mainPostInfo);
  }

  async getMainProjectHottestList(memberId: number): Promise<GetAllPostListTuple[]> {
    const mainPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.type = :type', { type: Type.PROJECT })
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(4)
      .orderBy('post.viewCount', 'DESC')
      .addOrderBy('post.scrapCount', 'DESC')
      .getRawMany()
    return plainToInstance(GetAllPostListTuple, mainPostInfo);
  }

  async getAllPostList(
    paginationRequest: PaginationRequest,
    stacks: string[],
    memberId: number,
    meetingType?: PostListType,
    position?: string,
    progressWay?: string,
    sortBy?: PostListSortBy,
    search?: string
  ): Promise<GetAllPostListTuple[]> {
    let query = this.getPostListBaseQuery(
      paginationRequest, stacks, meetingType, position, progressWay, sortBy, search)
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .select([
        'post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())

    const postList = await query.getRawMany();
    return plainToInstance(GetAllPostListTuple, postList);
  }


  async getAllPostListTotalCount(
    paginationRequest: PaginationRequest,
    stacks: string[],
    meetingType?: PostListType,
    position?: string,
    progressWay?: string,
    sortBy?: PostListSortBy,
    search?: string
  ) {
    return await this.getPostListBaseQuery(paginationRequest, stacks, meetingType, position, progressWay, sortBy, search).getCount();
  }

  private getPostListBaseQuery(
    paginationRequest: PaginationRequest,
    stacks: string[],
    meetingType?: PostListType,
    position?: string,
    progressWay?: string,
    sortBy?: PostListSortBy,
    search?: string
  ) {
    let query = this.dataSource.createQueryBuilder().from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .where('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL');


    if (meetingType && meetingType !== PostListType.ALL) {
      query = query.andWhere('post.type= :type', { type: meetingType });
    }
    if (position && position !== '전체') {
      query = query.andWhere('post.position like :position', { position: `%${position}%` });
    }
    if (progressWay) {
      query = query.andWhere('post.progressWay = :progressWay', { progressWay });
    }

    if (stacks.length > 0) {
      const stackConditions = stacks.map((stack, index) =>
        `post.stack like :stack${index}`).join(' AND ');
      const parameters = stacks.reduce((acc, stack, index) => {
        acc[`stack${index}`] = `%${stack}%`;
        return acc;
      }, {});
      query = query.andWhere(`(${stackConditions})`, parameters);
    }

    if (sortBy) {
      if (sortBy === PostListSortBy.LATEST) {
        query = query.orderBy('post.createdAt', 'DESC');
      }
      else if (sortBy === PostListSortBy.BY_DEADLINE) {
        query = query.andWhere('DATEDIFF(post.recruitEndAt, Now()) > 0');
        query = query.orderBy('post.recruitEndAt', 'ASC');
      }
      else if (sortBy === PostListSortBy.BY_VIEW) {
        query = query.orderBy('post.viewCount', 'DESC');
      }
    }

    if (search) {
      query = query.andWhere('post.title like :search', { search: `%${search}%` });
    }

    return query;
  }

  async getAllMyAppliedPost(paginationRequest: PaginationRequest, memberId: number)
    : Promise<GetAllPostListTuple[]> {
    const myAppliedPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .innerJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('team_member.member_id = :memberId', { memberId })
      .andWhere('team_member.invite_type = :teamInviteType', { teamInviteType: TeamInviteType.SELF })
      .andWhere('team_member.status = :teamMemberStatus', { teamMemberStatus: TeamMemberStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .select([
        'DISTINCT post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('post.created_at', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllPostListTuple, myAppliedPostInfo);
  }

  async getAllMyAppliedPostCount(memberId: number): Promise<number> {
    return await this.getMyAppliedPostBaseQuery(memberId).getCount();
  }

  private getMyAppliedPostBaseQuery(memberId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .innerJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .where('team_member.member_id = :memberId', { memberId })
      .andWhere('team_member.invite_type = :teamInviteType', { teamInviteType: TeamInviteType.SELF })
      .andWhere('team_member.status = :teamMemberStatus', { teamMemberStatus: TeamMemberStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
  }

  async getAllMyRecruitedPost(paginationRequest: PaginationRequest, memberId: number)
    : Promise<GetAllPostListTuple[]> {
    const myRecruitedPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.member_id = :memberId', { memberId })
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'DISTINCT post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('post.created_at', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllPostListTuple, myRecruitedPostInfo);
  }

  async getAllMyRecruitedPostCount(memberId: number): Promise<number> {
    return await this.getMyRecruitedPostBaseQuery(memberId).getCount();
  }

  private getMyRecruitedPostBaseQuery(memberId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .where('post.member_id = :memberId', { memberId })
      .andWhere('post.status = :status', { status: PostStatus.READY })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
  }

  async getAllMyOnGoingPost(paginationRequest: PaginationRequest, memberId: number)
    : Promise<GetAllPostListTuple[]> {
    const myOnGoingPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .leftJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.status = :status', { status: PostStatus.PROGRESS })
      .andWhere('(post.member_id = :memberId', { memberId })
      .orWhere('(team_member.member_id = :memberId AND team_member.status = :teamMemberStatus))', { memberId, teamMemberStatus: TeamMemberStatus.ACCEPT })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'DISTINCT post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('post.created_at', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllPostListTuple, myOnGoingPostInfo);
  }

  async getAllMyOnGoingPostCount(memberId: number): Promise<number> {
    return await this.getMyOnGoingPostBaseQuery(memberId).getCount();
  }

  private getMyOnGoingPostBaseQuery(memberId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .leftJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .where('post.status = :status', { status: PostStatus.PROGRESS })
      .andWhere('(post.member_id = :memberId', { memberId })
      .orWhere('(team_member.member_id = :memberId AND team_member.status = :teamMemberStatus))', { memberId, teamMemberStatus: TeamMemberStatus.ACCEPT })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
  }

  async getAllMyCompletedPost(paginationRequest: PaginationRequest, memberId: number)
    : Promise<GetAllCompletePostListTuple[]> {
    const myCompletedPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .leftJoin(PostReview, 'post_review', 'post_review.post_id = post.id AND post_review.member_id = :memberId')
      .where('(post.status = :endStatus OR post.status = :doneStatus)', { endStatus: PostStatus.PROGRESS_END, doneStatus: PostStatus.DONE })
      .andWhere('(post.member_id = :memberId', { memberId })
      .orWhere('(team_member.member_id = :memberId AND team_member.status = :teamMemberStatus))', { memberId, teamMemberStatus: TeamMemberStatus.ACCEPT })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'DISTINCT post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped',
        'post.status as postStatus',
        'CASE WHEN post_review.id IS NOT NULL THEN true ELSE false END as isReviewed'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('post.created_at', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllCompletePostListTuple, myCompletedPostInfo);
  }

  async getAllMyCompletedPostCount(memberId: number): Promise<number> {
    return await this.getMyCompletedPostBaseQuery(memberId).getCount();
  }

  private getMyCompletedPostBaseQuery(memberId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .leftJoin(PostReview, 'post_review', 'post_review.post_id = post.id AND post_review.member_id = :memberId')
      .where('(post.status = :endStatus OR post.status = :doneStatus)', { endStatus: PostStatus.PROGRESS_END, doneStatus: PostStatus.DONE })
      .andWhere('(post.member_id = :memberId', { memberId })
      .orWhere('(team_member.member_id = :memberId AND team_member.status = :teamMemberStatus))', { memberId, teamMemberStatus: TeamMemberStatus.ACCEPT })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
  }

  async getAllMyWaitingPost(paginationRequest: PaginationRequest, memberId: number)
    : Promise<GetAllPostListTuple[]> {
    const myWaitingPostInfo = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .innerJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id AND post_scrap.member_id = :memberId', { memberId })
      .where('post.status = :status', { status: PostStatus.READY })
      .andWhere('(team_member.member_id = :memberId AND team_member.status = :teamMemberStatus)', { memberId, teamMemberStatus: TeamMemberStatus.ACCEPT })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
      .select([
        'DISTINCT post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as positions',
        'post.stack as stacks',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'post.viewCount as viewCount',
        'post.commentCount as commentCount',
        'CASE WHEN post_scrap.id IS NOT NULL THEN true ELSE false END as isScraped'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('post.created_at', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllPostListTuple, myWaitingPostInfo);
  }

  async getAllMyWaitingPostCount(memberId: number): Promise<number> {
    return await this.getMyWaitingPostBaseQuery(memberId).getCount();
  }

  private getMyWaitingPostBaseQuery(memberId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'member.id = post.member_id')
      .innerJoin(TeamMember, 'team_member', 'post.id = team_member.post_id')
      .where('post.status = :status', { status: PostStatus.READY })
      .andWhere('(team_member.member_id = :memberId AND team_member.status = :teamMemberStatus)', { memberId, teamMemberStatus: TeamMemberStatus.ACCEPT })
      .andWhere('post.deletedAt IS NULL')
      .andWhere('member.deletedAt IS NULL')
  }

}

export class GetAllPostListTuple {
  @Transform(({ value }) => Number(value))
  @IsInt()
  postId!: number;
  type!: Type;
  recruitEndAt: Date;
  progressWay!: string;
  title!: string;
  @Transform(({ value }) => JSON.parse(value) || [])
  positions: string[];
  @Transform(({ value }) => JSON.parse(value) || [])
  stacks: string[];
  nickname: string;
  profileImageUrl: string;
  @Transform(({ value }) => Number(value))
  @IsInt()
  viewCount!: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentCount!: number;
  @Transform(({ value }) => value === 1)
  isScraped!: boolean;
}

export class GetAllCompletePostListTuple {
  @Transform(({ value }) => Number(value))
  @IsInt()
  postId!: number;
  type!: Type;
  recruitEndAt: Date;
  progressWay!: string;
  title!: string;
  @Transform(({ value }) => JSON.parse(value) || [])
  positions: string[];
  @Transform(({ value }) => JSON.parse(value) || [])
  stacks: string[];
  nickname: string;
  profileImageUrl: string;
  @Transform(({ value }) => Number(value))
  @IsInt()
  viewCount!: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentCount!: number;
  @Transform(({ value }) => value === 1)
  isScraped!: boolean;
  postStatus!: string;
  @Transform(({ value }) => value === 1)
  isReviewed!: boolean;
}
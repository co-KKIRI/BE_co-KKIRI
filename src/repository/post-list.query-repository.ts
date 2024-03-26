import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Transform, plainToInstance } from "class-transformer";
import { IsInt } from "class-validator";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { Comment } from "src/entity/comment.entity";
import { PostListSortBy, PostListType, PostStatus, Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { PostScrap } from "src/entity/post-scrap.entity";
import { PostView } from "src/entity/post-view.entity";
import { Post } from "src/entity/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostListQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getAllPostList(
    paginationRequest: PaginationRequest,
    stacks: string[],
    memberId: number,
    meetingType?: PostListType,
    position?: string,
    progressWay?: string,
    sortBy?: PostListSortBy,
  ): Promise<GetAllPostListTuple[]> {
    let query = this.getPostListBaseQuery(
      paginationRequest, stacks, meetingType, position, progressWay, sortBy)
      .innerJoin(Member, 'member', 'post.member_id = member.id')
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
    sortBy?: PostListSortBy
  ) {
    return await this.getPostListBaseQuery(paginationRequest, stacks, meetingType, position, progressWay, sortBy).getCount();
  }

  private getPostListBaseQuery(
    paginationRequest: PaginationRequest,
    stacks: string[],
    meetingType?: PostListType,
    position?: string,
    progressWay?: string,
    sortBy?: PostListSortBy
  ) {
    let query = this.dataSource.createQueryBuilder().from(Post, 'post');
    query = query.where('post.status = :status', { status: PostStatus.READY })

    if (meetingType && meetingType !== PostListType.ALL) {
      query = query.andWhere('post.type= :type', { type: meetingType });
    }
    if (position && position !== '전체') {
      query = query.andWhere('post.position like :position', { position: `%${position}%` });
    }
    if (progressWay) {
      query = query.andWhere('post.progressWay like :progressWay', { progressWay });
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
        query = query.orderBy('post.createdAt', paginationRequest.order);
      }
      else if (sortBy === PostListSortBy.BY_DEADLINE) {
        query = query.andWhere('DATEDIFF(post.recruitEndAt, CURRENT_DATE()) > 0');
        query = query.orderBy('DATEDIFF(post.recruitEndAt, CURRENT_DATE())');
      }
      else if (sortBy === PostListSortBy.BY_VIEW) {
        query = query.orderBy('post.viewCount', paginationRequest.order);
      }
    }

    return query;
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
  @Transform(({ value }) => value === '1')
  isScraped!: boolean;
}
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Post } from '../entity/post.entity';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ScoutQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getScoutPostList(paginationRequest: PaginationRequest, memberId: number): Promise<ScoutPostTuple[]> {
    const postList = await this.baseQuery(memberId)
      .select(['post.id as postId', 'post.title as title'])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('post.createdAt', paginationRequest.order)
      .getRawMany();

    return plainToInstance(ScoutPostTuple, postList);
  }

  async getScoutPostListTotalCount(memberId: number): Promise<number> {
    return await this.baseQuery(memberId).getCount();
  }

  baseQuery(memberId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .where('post.memberId = :memberId', { memberId })
      .select(['post.id as postId', 'post.title as title']);
  }
}

export class ScoutPostTuple {
  postId!: number;
  title?: string;
}

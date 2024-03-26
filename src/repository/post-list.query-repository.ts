import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Transform, plainToInstance } from "class-transformer";
import { IsInt } from "class-validator";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { Comment } from "src/entity/comment.entity";
import { PostStatus, Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { PostView } from "src/entity/post-view.entity";
import { Post } from "src/entity/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostListQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getAllPostList(paginationRequest: PaginationRequest): Promise<GetAllPostListTuple[]> {
    const postList = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .where('post.status = :status', { status: PostStatus.READY })
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
        'post.commentCount as commentCount'
      ])
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      //.orderBy()
      .getRawMany();
    return plainToInstance(GetAllPostListTuple, postList);
  }

  async getAllPostListTotalCount(): Promise<number> {
    return await this.getPostListBaseQuery().getCount();
  }

  private getPostListBaseQuery() {
    return this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .where('post.status = :status', { status: PostStatus.READY })
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
}
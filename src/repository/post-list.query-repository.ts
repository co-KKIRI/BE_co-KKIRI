import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Comment } from "src/entity/comment.entity";
import { PostStatus, Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { PostView } from "src/entity/post-view.entity";
import { Post } from "src/entity/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostListQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getAllPostList() {
    const postList = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .leftJoinAndMapOne('post.id', PostView, 'post_view', 'post_view.postId = post.id')
      .leftJoinAndMapOne('post.id', Comment, 'comment', 'comment.postId = post.id')
      .where('post.status = :status', { status: PostStatus.READY })
      .select([
        'post.id as postId',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressWay as progressWay',
        'post.title as title',
        'post.position as position',
        'post.stack as stack',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'COUNT(DISTINCT post_view.id) as postViews',
        'COUNT(DISTINCT comment.id) as postCommentsNum'

      ])
      .groupBy('post.id')
      .getRawMany();
    return plainToInstance(GetAllPostListTuple, postList);
  }
}

export class GetAllPostListTuple {
  postId!: number;
  type!: Type;
  recruitEndAt: Date;
  progressWay!: string;
  title!: string;
  position!: string[];
  stack: string[];
  nickname: string;
  profileImageUrl: string;
  postViews!: number;
  postCommentsNum!: number;
}
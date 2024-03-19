import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { PostStatus, Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { Post } from "src/entity/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostListQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getAllPostList(){
    const postList = await this.dataSource
    .createQueryBuilder()
    .from(Post,'post')
    .innerJoin(Member,'member','post.member_id=member.id')
    .where('post.status = :status',{status: PostStatus.READY})
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

    ])
    .getRawMany();
    return plainToInstance(GetAllPostListTuple, postList);
  }
}

export class GetAllPostListTuple {
  postId!: number;
  type!: Type;
  recruitEndAt!: string;
  progressWay!: string;
  title!: string;
  position!: string[];
  stack: string[];
  nickname: string;
  profileImageUrl: string;
}
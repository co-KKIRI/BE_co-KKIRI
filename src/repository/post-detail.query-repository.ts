import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { Post } from "src/entity/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PostDetailQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getAllPostDetails(postId: number) {
    const postDetail = await this.dataSource
      .createQueryBuilder()
      .from(Post, 'post')
      .innerJoin(Member, 'member', 'post.member_id = member.id')
      .where('post.id = :postId', { postId })
      .select([
        'post.title as postTitle',
        'post.content as postContent',
        'member.profileImageUrl as userProfileImg',
        'member.nickname as userNickname',
        'post.createdAt as createdAt',
        'post.type as type',
        'post.recruitEndAt as recruitEndAt',
        'post.progressPeriod as progressPeriod',
        'post.progressWay as progressWay',
        'post.contactWay as contactWay',
        'post.capacity as capacity',
        'post.position as positions',
        'post.stack as stacks',
        //views
        //scraps
        //commentsNum
        // .isScraped
      ])
      .getRawOne();
    return plainToInstance(GetAllPostDetailTuple, postDetail);
  }
}

export class GetAllPostDetailTuple {
  postTitle!: string;
  postContent: string;
  userProfileImg: string;
  userNickname: string;
  createdAt!: Date;
  type!: Type;
  recruitEndAt: Date;
  // TODO : 결정해지는 대로 enum으로 바꿔야함
  progressPeriod: string;
  progressWay: string;
  contactWay: string;
  capacity: number;
  positions: string[];
  stacks: string[];

}
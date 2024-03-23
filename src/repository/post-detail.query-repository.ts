import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Transform, plainToInstance } from "class-transformer";
import { IsDate, IsInt } from "class-validator";
import { Comment } from "src/entity/comment.entity";
import { Type } from "src/entity/common/Enums";
import { Member } from "src/entity/member.entity";
import { PostScrap } from "src/entity/post-scrap.entity";
import { PostView } from "src/entity/post-view.entity";
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
      .leftJoin(PostView, 'post_view', 'post_view.postId = post.id')
      .leftJoin(PostScrap, 'post_scrap', 'post_scrap.post_id = post.id')
      .leftJoin(Comment, 'comment', 'comment.post_id = post.id')
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
        'COUNT(DISTINCT post_view.id) as views',
        'COUNT(DISTINCT post_scrap.id) as scraps',
        'COUNT(DISTINCT comment.id) as commentsNum',
      ])
      .groupBy('post.id')
      .getRawOne();
    return plainToInstance(GetAllPostDetailTuple, postDetail);
  }

  async getAllComments(postId: number) {
    const commentsInfo = await this.dataSource
      .createQueryBuilder()
      .from(Comment, 'comment')
      .innerJoin(Member, 'member', 'member.id = comment.member_id')
      .where('comment.post_id = :postId', { postId })
      .select([
        'comment.id as commentId',
        'comment.member_id as commentMemberId',
        'member.profile_image_url as commentProfileImg',
        'comment.created_at as commentCreatedAt',
        'member.nickname as commentNickname',
        'comment.content as commentContent',
      ])
      .orderBy('comment.created_at', 'ASC')
      .getRawMany();
    return plainToInstance(GetAllPostCommentTuple, commentsInfo);

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
  @Transform(({ value }) => value?.split(',') || [])
  positions: string[];
  @Transform(({ value }) => value?.split(',') || [])
  stacks: string[];
  @Transform(({ value }) => Number(value))
  @IsInt()
  views: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  scraps: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentsNum: number;

}

export class GetAllPostCommentTuple {
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentId!: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentMemberId!: number;
  commentCreatedAt!: Date;
  commentProfileImg?: string;
  commentNickname?: string;
  commentContent?: string;
}
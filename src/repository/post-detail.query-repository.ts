import { PaginationRequest } from './../common/pagination/pagination-request';
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Transform, plainToInstance } from "class-transformer";
import { IsDate, IsInt, IsOptional } from "class-validator";
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
        'post.link as link',
        'post.viewCount as viewCount',
        'post.scrapCount as scrapCount',
        'post.commentCount as commentCount',
      ])
      .groupBy('post.id')
      .getRawOne();
    return plainToInstance(GetAllPostDetailTuple, postDetail);
  }

  async getAllCommentsTotalCount(postId: number): Promise<number> {
    return await this.getCommentBaseQuery(postId).getCount();
  }

  private getCommentBaseQuery(postId: number) {
    return this.dataSource
      .createQueryBuilder()
      .from(Comment, 'comment')
      .innerJoin(Post, 'post', 'comment.post_id = post.id')
      .where('comment.post_id = :postId', { postId })
  }


  async getAllComments(postId: number, paginationRequest: PaginationRequest)
    : Promise<GetAllPostCommentTuple[]> {
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
      .limit(paginationRequest.take)
      .offset(paginationRequest.getSkip())
      .orderBy('comment.updated_at', paginationRequest.order)
      .getRawMany();
    return plainToInstance(GetAllPostCommentTuple, commentsInfo);

  }

  async updateView(postId: number, view: number) {
    return this.dataSource
      .createQueryBuilder()
      .update(Post)
      .set({ viewCount: view })
      .where('id = :postId', { postId })
      .execute()
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
  link: string;
  @Transform(({ value }) => JSON.parse(value) || [])
  positions: string[];
  @Transform(({ value }) => JSON.parse(value) || [])
  stacks: string[];
  @Transform(({ value }) => Number(value))
  @IsInt()
  viewCount: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  scrapCount: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentCount: number;

}

export class GetAllPostCommentTuple {
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentId!: number;
  @Transform(({ value }) => Number(value))
  @IsInt()
  commentMemberId!: number;
  commentCreatedAt!: Date;
  @IsOptional()
  commentProfileImg?: string;
  @IsOptional()
  commentNickname?: string;
  @IsOptional()
  commentContent?: string;
}
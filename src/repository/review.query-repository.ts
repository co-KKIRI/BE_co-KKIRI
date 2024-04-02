import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ReviewType } from "src/entity/common/Enums";
import { MemberReviewComment } from "src/entity/member-review-comment-entity";
import { MemberReview } from "src/entity/member-review.entity";
import { PostReview } from "src/entity/post-review.entity";
import { Post } from "src/entity/post.entity";
import { DataSource } from "typeorm";

@Injectable()
export class reviewQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async getPostReview(postId: number): Promise<PostReviewTuple[]> {
    const postReviews = await this.dataSource
      .createQueryBuilder()
      .from(PostReview, 'post_review')
      .where('post_review.postId = :postId', { postId })
      .getRawMany();
    return plainToInstance(PostReviewTuple, postReviews);
  }

  async getMemberReview(postId: number, memberId: number): Promise<PostReviewTuple[]> {
    const memberReviews = await this.dataSource
      .createQueryBuilder()
      .from(MemberReview, 'member_review')
      .where('member_review.postId = :postId', { postId })
      .andWhere('member_review.revieweeMemberId = :memberId', { memberId })
      .getRawMany();
    return plainToInstance(PostReviewTuple, memberReviews);
  }

  async getMemberReviewComment(postId: number, memberId: number): Promise<MemberReviewCommentTuple[]> {
    const memberReviewComments = await this.dataSource
      .createQueryBuilder()
      .from(MemberReviewComment, 'member_review_comment')
      .where('member_review_comment.postId = :postId', { postId })
      .andWhere('member_review_comment.revieweeMemberId = :memberId', { memberId })
      .getRawMany();
    return plainToInstance(MemberReviewCommentTuple, memberReviewComments);
  }
}

export class PostReviewTuple {
  type: ReviewType;
  content: string;
}

export class MemberReviewCommentTuple {
  comment: string;
}
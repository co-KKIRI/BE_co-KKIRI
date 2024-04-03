import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'member_review_comment' })
export class MemberReviewComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_id', nullable: false })
  postId: number;

  @Column({ name: 'reviewer_member_id', nullable: false })
  reviewerMemberId: number;

  @Column({ name: 'reviewee_member_id', nullable: false })
  revieweeMemberId: number;

  @Column({ name: 'comment', length: 200 })
  comment: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;
}

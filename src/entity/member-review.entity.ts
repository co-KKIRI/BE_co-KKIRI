import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ReviewType } from './common/Enums';

@Entity({
  name: 'member_review',
})
export class MemberReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'post_id', type: 'int', nullable: false })
  postId!: number;

  @Column({ name: 'reviewer_member_id', type: 'int', nullable: false })
  reviewerMemberId!: number;

  @Column({ name: 'reviewee_member_id', type: 'int', nullable: false })
  revieweeMemberId!: number;

  @Column({ name: 'type', type: 'enum', enum: ReviewType, nullable: false })
  type!: ReviewType;

  @Column({ name: 'content', length: 200, nullable: true })
  content?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt!: Date;
}

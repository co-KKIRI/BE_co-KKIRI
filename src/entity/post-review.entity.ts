import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ReviewType } from './common/Enums';

@Entity({
  name: 'post_review',
})
export class PostReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'post_id', type: 'int', nullable: false })
  postId!: number;

  @Column({ name: 'member_id', type: 'int', nullable: false })
  memberId!: number;

  @Column({ name: 'type', type: 'enum', enum: ReviewType, nullable: false })
  type!: ReviewType;

  @Column({ name: 'content', length: 200, nullable: true })
  content?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt!: Date;
}

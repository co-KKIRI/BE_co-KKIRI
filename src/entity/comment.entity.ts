import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'post_id', nullable: false })
  postId: number;

  @Column({ name: 'member_id', nullable: false })
  memberId: number;

  @Column({ length: 100 })
  content: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;

  setCommentInfo(content: string) { this.content = content };
}

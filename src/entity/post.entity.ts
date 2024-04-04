import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PostStatus, Type } from './common/Enums';

@Entity({
  name: 'post',
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id', nullable: false })
  memberId: number;

  @Column({ length: 45 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @Column({ type: 'enum', enum: PostStatus })
  status: PostStatus;

  @Column({ name: 'recruit_start_at' })
  recruitStartAt: Date;

  @Column({ name: 'recruit_end_at' })
  recruitEndAt: Date;

  @Column({ name: 'progress_period', length: 45 })
  progressPeriod: string;

  @Column({ name: 'contact_way', length: 45 })
  contactWay: string;

  @Column({ name: 'progress_way', length: 45 })
  progressWay: string;

  @Column({ length: 200 })
  stack?: string;

  @Column({ length: 45 })
  position: string;

  @Column({ name: 'image_url', length: 200 })
  imageUrl: string;

  @Column()
  capacity: number;

  @Column({ name: 'view_count' })
  viewCount: number;

  @Column({ name: 'scrap_count' })
  scrapCount: number;

  @Column({ name: 'comment_count' })
  commentCount: number;

  @Column({ name: 'link', length: 100 })
  link?: string;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;

  setStatus(status: PostStatus) {
    this.status = status;
  }

  isModifiableStart() {
    return [PostStatus.READY].includes(this.status);
  }

  isModifiableEnd() {
    return [PostStatus.READY, PostStatus.PROGRESS].includes(this.status);
  }

  isModifiableReviewEnd() {
    return [PostStatus.PROGRESS_END].includes(this.status);
  }

  setPostInfo(
    type: Type,
    recruitEndAt: Date,
    progressPeriod: string,
    capacity: number,
    contactWay: string,
    progressWay: string,
    stacks: string,
    positions: string,
    title: string,
    content: string,
    link?: string,
  ) {
    this.type = type;
    this.recruitEndAt = recruitEndAt;
    this.progressPeriod = progressPeriod;
    this.capacity = capacity;
    this.contactWay = contactWay;
    this.progressWay = progressWay;
    this.stack = stacks;
    this.position = positions;
    this.title = title;
    this.content = content;
    this.link = link;
  }

  deletePostInfo(deletedAt?: Date) {
    this.deletedAt = deletedAt;
  }
}

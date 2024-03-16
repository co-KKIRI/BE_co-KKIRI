import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status, Type } from './common/Enums';

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

  @Column({ length: 200 })
  content: string;

  @Column({ type: 'enum', enum: Type })
  type: string;

  @Column({ type: 'enum', enum: Status })
  status: string;

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
  stack: string;

  @Column({ length: 45 })
  position: string;

  @Column({ name: 'image_url', length: 200 })
  imageUrl: string;

  @Column()
  capacity: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

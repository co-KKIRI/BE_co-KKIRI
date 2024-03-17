import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SocialProvider } from './common/SocialProvider';

@Entity({
  name: 'member',
})
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  nickname: string;

  @Column({ name: 'profile_image_url', length: 200 })
  profileImageUrl: string;

  @Column({ length: 45 })
  position: string;

  @Column()
  career: number;

  @Column({ length: 200 })
  introduce: string;

  @Column({ length: 200 })
  stack: string;

  @Column('text')
  link: string;

  @Column({ name: 'is_visible_profile' })
  isVisibleProfile: boolean;

  @Column({ name: 'social_provider', nullable: false })
  socialProvider: string;

  @Column({ name: 'external_id', nullable: false })
  externalId: string;

  @Column({ name: 'deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;
}

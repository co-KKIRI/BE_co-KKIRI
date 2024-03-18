import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SocialProvider } from './common/SocialProvider';

@Entity({
  name: 'member',
})
export class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nickname', type: 'varchar', length: 45, nullable: true })
  nickname?: string;

  @Column({ name: 'profile_image_url', type: 'varchar', length: 200, nullable: true })
  profileImageUrl?: string;

  @Column({ name: 'position', type: 'varchar', length: 45, nullable: true })
  position?: string;

  @Column({ name: 'career', type: 'int', nullable: true })
  career?: number;

  @Column({ name: 'introduce', type: 'varchar', length: 200, nullable: true })
  introduce?: string;

  @Column({ name: 'stack', type: 'varchar', length: 200, nullable: true })
  stack?: string;

  @Column({ name: 'link', type: 'text', nullable: true })
  link?: string;

  @Column({ name: 'is_visible_profile', type: 'boolean', nullable: true })
  isVisibleProfile: boolean | null;

  @Column({ name: 'social_provider', type: 'enum', enum: SocialProvider, nullable: false })
  socialProvider!: SocialProvider;

  @Column({ name: 'external_id', type: 'varchar', length: 100, nullable: false })
  externalId!: string;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updatedAt!: Date;

  setProfileInfo(nickname: string, profileImageUrl: string) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fcm_token' })
export class FCMToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'member_id', nullable: false })
  memberId: number;

  @Column({ name: 'token_id', nullable: false, length: 255 })
  tokenId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt!: Date;

  @Column({ length: 45, nullable: true })
  device?: string;

  @Column({ length: 45, nullable: true })
  os?: string;

  @Column({ length: 45, nullable: true })
  browser?: string;
}

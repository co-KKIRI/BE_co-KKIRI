import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeamInviteType, TeamMemberStatus } from './common/Enums';

@Entity({
  name: 'team_member',
})
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'post_id', nullable: false })
  postId: number;

  @Column({ name: 'member_id', nullable: false })
  memberId: number;

  @Column({ name: 'team_invite_id', nullable: true })
  teamInviteId: number;

  @Column({ type: 'enum', enum: TeamMemberStatus })
  status: TeamMemberStatus;

  @Column({ type: 'enum', name: 'invite_type', enum: TeamInviteType })
  inviteType: TeamInviteType;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;

  setStatus(status: TeamMemberStatus): void {
    this.status = status;
  }
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'team_invite' })
export class TeamInvite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'send_member_id', nullable: false })
  sendMemberId: number;

  @Column({ name: 'receive_member_id', nullable: false })
  receiveMemberId: number;

  @Column({ name: 'post_id', nullable: false })
  postId: number;

  @Column({ length: 200 })
  message: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: false })
  updatedAt: Date;

  static invite(sendMemberId: number, receiveMemberId: number, postId: number, message: string): TeamInvite {
    const teamInvite = new TeamInvite();
    teamInvite.sendMemberId = sendMemberId;
    teamInvite.receiveMemberId = receiveMemberId;
    teamInvite.postId = postId;
    teamInvite.message = message;
    return teamInvite;
  }
}

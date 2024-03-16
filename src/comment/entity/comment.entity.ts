import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'post_id', nullable: false })
	postId: number;

	@Column({ name: 'member_id', nullable: false })
	memberId: number;

	@Column({ length: 100 })
	content: string;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;
}
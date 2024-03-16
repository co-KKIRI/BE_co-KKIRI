import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class member {
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

	@Column({name:'is_visible_profile'})
	isVisibleProfile: boolean;

	@Column({name: 'deleted_at'})
	deletedAt: Date;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;
}
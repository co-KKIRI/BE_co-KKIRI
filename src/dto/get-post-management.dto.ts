import { PostStatus, Type } from '../entity/common/Enums';
import { Post } from '../entity/post.entity';

type GetPostManagementDtoOptions = {
  post: Post;
  isLeader: boolean;
  isReviewed: boolean;
};

export class GetPostManagementDto {
  postId!: number;
  postTitle: string;
  type!: Type;
  progressWay: string;
  status!: PostStatus;
  contactWay: string;
  capacity: number;
  positions: string[];
  isLeader: boolean;
  isReviewed: boolean;
  stacks: string[];
  link?: string;
  recruitEndAt?: Date;
  progressPeriod?: string;

  constructor({ post, isLeader, isReviewed }: GetPostManagementDtoOptions) {
    this.postId = post.id;
    this.postTitle = post.title;
    this.type = post.type;
    this.progressWay = post.progressWay;
    this.status = post.status;
    this.contactWay = post.contactWay;
    this.capacity = post.capacity;
    this.positions = post.position ? JSON.parse(post.position) : [];
    this.isLeader = isLeader;
    this.isReviewed = isReviewed;
    this.stacks = post.stack ? JSON.parse(post.stack) : [];
    this.link = post.link;
    this.recruitEndAt = post.recruitEndAt;
    this.progressPeriod = post.progressPeriod;
  }
}

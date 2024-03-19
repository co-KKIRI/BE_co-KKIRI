import { PostStatus, Type } from '../entity/common/Enums';
import { Post } from '../entity/post.entity';

type GetPostManagementDtoOptions = {
  post: Post;
  isLeader: boolean;
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

  constructor({ post, isLeader }: GetPostManagementDtoOptions) {
    this.postId = post.id;
    this.postTitle = post.title;
    this.type = post.type;
    this.progressWay = post.progressWay;
    this.status = post.status;
    this.contactWay = post.contactWay;
    this.capacity = post.capacity;
    this.positions = post.position?.split(',') || [];
    this.isLeader = isLeader;
  }
}

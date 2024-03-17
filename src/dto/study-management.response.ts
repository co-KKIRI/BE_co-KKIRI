import { PostStatus, Type } from '../entity/common/Enums';
import { ApiProperty } from '@nestjs/swagger';

export class StudyManagementResponse {
  @ApiProperty()
  postId!: number;
  @ApiProperty()
  postTitle!: string;
  @ApiProperty()
  type!: Type;
  @ApiProperty()
  progressWay!: string;
  @ApiProperty()
  status!: PostStatus;
  @ApiProperty()
  contactWay!: string;
  @ApiProperty()
  capacity!: number;
  @ApiProperty()
  positions!: string[];
  @ApiProperty()
  isLeader!: boolean;

  constructor(
    postId: number,
    postTitle: string,
    type: Type,
    progressWay: string,
    status: PostStatus,
    contactWay: string,
    capacity: number,
    positions: string[],
    isLeader: boolean,
  ) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.type = type;
    this.progressWay = progressWay;
    this.status = status;
    this.contactWay = contactWay;
    this.capacity = capacity;
    this.positions = positions;
    this.isLeader = isLeader;
  }
}

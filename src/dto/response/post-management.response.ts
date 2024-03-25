import { PostStatus, Type } from '../../entity/common/Enums';
import { ApiProperty } from '@nestjs/swagger';
import { GetPostManagementDto } from '../get-post-management.dto';

export class PostManagementResponse {
  @ApiProperty()
  postId!: number;
  @ApiProperty()
  postTitle: string;
  @ApiProperty()
  type!: Type;
  @ApiProperty()
  progressWay: string;
  @ApiProperty()
  status!: PostStatus;
  @ApiProperty()
  contactWay: string;
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  positions: string[];
  @ApiProperty()
  isLeader!: boolean;
  @ApiProperty()
  stacks: string[];

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
    stacks: string[],
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
    this.stacks = stacks;
  }

  static from(dto: GetPostManagementDto) {
    return new PostManagementResponse(
      dto.postId,
      dto.postTitle,
      dto.type,
      dto.progressWay,
      dto.status,
      dto.contactWay,
      dto.capacity,
      dto.positions,
      dto.isLeader,
      dto.stacks,
    );
  }
}

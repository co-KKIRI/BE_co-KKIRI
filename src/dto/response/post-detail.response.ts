import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";
import { GetPostDetailDto } from "../get-post-detail.dto";

export class PostDetails {
  @ApiProperty()
  postTitle!: string;
  @ApiProperty()
  postContent: string;
  @ApiProperty()
  userProfileImg?: string;
  @ApiProperty()
  userNickname?: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  type!: Type;
  @ApiProperty()
  recruitEndAt: Date;
  @ApiProperty()
  progressPeriod: string;
  @ApiProperty()
  progressWay: string;
  @ApiProperty()
  contactWay: string;
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  positions: string[];
  @ApiProperty()
  stacks: string[];
  @ApiProperty()
  link: string;
  @ApiProperty()
  viewCount!: number;
  @ApiProperty()
  scrapCount!: number;
  @ApiProperty()
  commentCount!: number;

  constructor(
    postTitle: string,
    postContent: string,
    userProfileImg: string,
    userNickname: string,
    createdAt: Date,
    type: Type,
    recruitEndAt: Date,
    progressPeriod: string,
    progressWay: string,
    contactWay: string,
    capacity: number,
    positions: string[],
    stacks: string[],
    link: string,
    viewCount: number,
    scrapCount: number,
    commentCount: number,
  ) {
    this.postTitle = postTitle;
    this.postContent = postContent;
    this.userProfileImg = userProfileImg;
    this.userNickname = userNickname;
    this.createdAt = createdAt;
    this.type = type;
    this.recruitEndAt = recruitEndAt;
    this.progressPeriod = progressPeriod;
    this.progressWay = progressWay;
    this.contactWay = contactWay;
    this.capacity = capacity;
    this.positions = positions;
    this.stacks = stacks;
    this.link=link;
    this.viewCount = viewCount;
    this.scrapCount = scrapCount;
    this.commentCount = commentCount;
  }
}
export class PostDetailResponse {
  @ApiProperty({ type: PostDetails })
  postDetails!: PostDetails;

  constructor(postDetails: PostDetails) {
    this.postDetails = postDetails;
  }

  static from(dto: GetPostDetailDto) {
    const postDetails = new PostDetails(
      dto.postDetail.postTitle,
      dto.postDetail.postContent,
      dto.postDetail.userProfileImg,
      dto.postDetail.userNickname,
      dto.postDetail.createdAt,
      dto.postDetail.type,
      dto.postDetail.recruitEndAt,
      dto.postDetail.progressPeriod,
      dto.postDetail.progressWay,
      dto.postDetail.contactWay,
      dto.postDetail.capacity,
      dto.postDetail.positions,
      dto.postDetail.stacks,
      dto.postDetail.link,
      dto.postDetail.viewCount,
      dto.postDetail.scrapCount,
      dto.postDetail.commentCount,
    );
    return new PostDetailResponse(postDetails);
  }

}
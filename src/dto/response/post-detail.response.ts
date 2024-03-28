import { ApiProperty } from "@nestjs/swagger";
import { PostApplyStatus, Type } from "src/entity/common/Enums";
import { GetPostDetailDto } from "../get-post-detail.dto";

export class PostDetails {
  @ApiProperty()
  postTitle!: string;
  @ApiProperty()
  postMemberId!: number;
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
  isScraped!: boolean;
  @ApiProperty()
  viewCount!: number;
  @ApiProperty()
  scrapCount!: number;
  @ApiProperty()
  commentCount!: number;


  constructor(
    postTitle: string,
    postMemberId: number,
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
    isScraped: boolean,
    viewCount: number,
    scrapCount: number,
    commentCount: number,

  ) {
    this.postTitle = postTitle;
    this.postMemberId = postMemberId;
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
    this.link = link;
    this.isScraped = isScraped;
    this.viewCount = viewCount;
    this.scrapCount = scrapCount;
    this.commentCount = commentCount;

  }
}
export class PostDetailResponse {
  @ApiProperty({ type: PostDetails })
  postDetails!: PostDetails;
  postApplyStatus!: PostApplyStatus;

  constructor(postDetails: PostDetails, postApplyStatus: PostApplyStatus) {
    this.postDetails = postDetails;
    this.postApplyStatus = postApplyStatus;
  }

  static from(dto: GetPostDetailDto) {
    const postDetails = new PostDetails(
      dto.postDetail.postTitle,
      dto.postDetail.postMemberId,
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
      dto.postDetail.isScraped,
      dto.postDetail.viewCount,
      dto.postDetail.scrapCount,
      dto.postDetail.commentCount,
    );
    return new PostDetailResponse(postDetails, dto.postApplyStatus);
  }

}
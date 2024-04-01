import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";
import { GetCompletePostedList } from "../get-post-complete.dto";

export class PostCompleteListResponse {
  @ApiProperty()
  postId!: number;
  @ApiProperty()
  type!: Type;
  @ApiProperty()
  recruitEndAt!: Date;
  @ApiProperty()
  progressWay!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  positions: string[];
  @ApiProperty()
  stacks: string[];
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  profileImageUrl: string;
  @ApiProperty()
  viewCount!: number;
  @ApiProperty()
  commentCount!: number;
  @ApiProperty()
  isScraped!: boolean;
  @ApiProperty()
  postStatus!: string;
  @ApiProperty()
  isReviewed!: boolean;

  constructor(
    postId: number,
    type: Type,
    recruitEndAt: Date,
    progressWay: string,
    title: string,
    positions: string[],
    stacks: string[],
    nickname: string,
    profileImageUrl: string,
    viewCount: number,
    commentCount: number,
    isScraped: boolean,
    postStatus: string,
    isReviewed: boolean,
  ) {
    this.postId = postId;
    this.type = type;
    this.recruitEndAt = recruitEndAt;
    this.progressWay = progressWay;
    this.title = title;
    this.positions = positions;
    this.stacks = stacks;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.viewCount = viewCount;
    this.commentCount = commentCount;
    this.isScraped = isScraped;
    this.postStatus = postStatus;
    this.isReviewed = isReviewed;
  }

  static from(getCompletePostLists: GetCompletePostedList[]) {
    return getCompletePostLists.map(
      (getCompletePostLists) =>
        new PostCompleteListResponse(
          getCompletePostLists.postId,
          getCompletePostLists.type,
          getCompletePostLists.recruitEndAt,
          getCompletePostLists.progressWay,
          getCompletePostLists.title,
          getCompletePostLists.positions,
          getCompletePostLists.stacks,
          getCompletePostLists.nickname,
          getCompletePostLists.profileImageUrl,
          getCompletePostLists.viewCount,
          getCompletePostLists.commentCount,
          getCompletePostLists.isScraped,
          getCompletePostLists.postStatus,
          getCompletePostLists.isReviewed
        )
    )
  }
}


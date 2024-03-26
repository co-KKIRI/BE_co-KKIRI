import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";
import { GetPostListDto, GetPostedList } from "../get-post-list.dto";

export class PostListResponse {
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
  }

  static from(getPostLists: GetPostedList[]) {
    return getPostLists.map(
      (getPostLists) =>
        new PostListResponse(
          getPostLists.postId,
          getPostLists.type,
          getPostLists.recruitEndAt,
          getPostLists.progressWay,
          getPostLists.title,
          getPostLists.positions,
          getPostLists.stacks,
          getPostLists.nickname,
          getPostLists.profileImageUrl,
          getPostLists.viewCount,
          getPostLists.commentCount,
          getPostLists.isScraped
        )
    )
  }
}


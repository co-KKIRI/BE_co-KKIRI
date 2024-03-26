import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";
import { GetPostListDto, GetPostedList } from "../get-post-list.dto";

export class PostedList {
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

  static from(tuple: PostedList) {
    return new PostedList(
      tuple.postId,
      tuple.type,
      tuple.recruitEndAt,
      tuple.progressWay,
      tuple.title,
      tuple.positions,
      tuple.stacks,
      tuple.nickname,
      tuple.profileImageUrl,
      tuple.viewCount,
      tuple.commentCount,
      tuple.isScraped
    );
  }
}

export class PostListResponse {
  @ApiProperty({ type: PostedList })
  postInfo!: PostedList[];

  constructor(postInfo: PostedList[]) {
    this.postInfo = postInfo;
  }

  static from(getPostLists: GetPostedList[]) {
    const postListInfo = getPostLists.map((tuple) => {
      return PostedList.from(tuple);
    });
    return new GetPostListDto(postListInfo);
  }
}


import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";
import { GetPostListDto } from "../get-post-list.dto";

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
  position!: string[];
  @ApiProperty()
  stack: string[];
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  profileImageUrl: string;
  @ApiProperty()
  postViews!: number;
  @ApiProperty()
  postCommentsNum!: number;

  constructor(
    postId: number,
    type: Type,
    recruitEndAt: Date,
    progressWay: string,
    title: string,
    position: string[],
    stack: string[],
    nickname: string,
    profileImageUrl: string,
    postViews: number,
    postCommentsNum: number,
  ) {
    this.postId = postId;
    this.type = type;
    this.recruitEndAt = recruitEndAt;
    this.progressWay = progressWay;
    this.title = title;
    this.position = position;
    this.stack = stack;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.postViews = postViews;
    this.postCommentsNum = postCommentsNum;
  }
}

export class PostListResponse {
  @ApiProperty({ type: PostedList })
  postInfo!: PostedList[];

  constructor(postInfo: PostedList[]) {
    this.postInfo = postInfo;
  }

  static from(getPostListDto: GetPostListDto) {
    const postedListInfo = getPostListDto.postInfo.map((postedList) => {
      return new PostedList(
        postedList.postId,
        postedList.type,
        postedList.recruitEndAt,
        postedList.progressWay,
        postedList.title,
        postedList.position,
        postedList.stack,
        postedList.nickname,
        postedList.profileImageUrl,
        postedList.postViews,
        postedList.postCommentsNum
      );
    });
    return new PostListResponse(postedListInfo);
  }
}


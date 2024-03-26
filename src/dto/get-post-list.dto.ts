import { Type } from "src/entity/common/Enums";
import { GetAllPostListTuple } from "src/repository/post-list.query-repository";

export class GetPostListDto {
  postInfo!: GetPostedList[]

  constructor(postInfo: GetPostedList[]) {
    this.postInfo = postInfo;
  }

  static from(tuples: GetAllPostListTuple[]) {
    const postedListInfo = tuples.map((tuple) => {
      return GetPostedList.from(tuple);
    });
    return new GetPostListDto(postedListInfo);
  }
}



export class GetPostedList {
  postId!: number;
  type!: Type;
  recruitEndAt: Date;
  progressWay!: string;
  title!: string;
  positions: string[];
  stacks: string[];
  nickname: string;
  profileImageUrl: string;
  viewCount!: number;
  commentCount!: number;
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
    postViews: number,
    postCommentsNum: number,
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
    this.viewCount = postViews;
    this.commentCount = postCommentsNum;
    this.isScraped = isScraped;
  }

  static from(tuple: GetAllPostListTuple) {
    return new GetPostedList(
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
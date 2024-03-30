import { Type } from "src/entity/common/Enums";
import { GetAllCompletePostListTuple } from "src/repository/post-list.query-repository";

export class GetCompletePostListDto {
  completePostInfo!: GetCompletePostedList[]

  constructor(completePostInfo: GetCompletePostedList[]) {
    this.completePostInfo = completePostInfo;
  }

  static from(tuples: GetAllCompletePostListTuple[]) {
    const completePostInfo = tuples.map((tuple) => {
      return GetCompletePostedList.from(tuple);
    });
    return new GetCompletePostListDto(completePostInfo);
  }
}



export class GetCompletePostedList {
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
  postStatus!: string;

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
    postStatus: string,
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
    this.postStatus = postStatus;
  }

  static from(tuple: GetAllCompletePostListTuple) {
    return new GetCompletePostedList(
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
      tuple.isScraped,
      tuple.postStatus
    );
  }
}
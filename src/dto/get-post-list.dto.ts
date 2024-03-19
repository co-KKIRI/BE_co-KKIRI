import { Type } from "src/entity/common/Enums";
import { GetAllPostListTuple } from "src/repository/post-list.query-repository";

export class GetPostListDto {
  postInfo!: GetPostedList[]

  constructor(postInfo: GetPostedList[]) {
    this.postInfo = postInfo;
  }

  static from(tuples: GetAllPostListTuple[]) {
    const postedListInfo = tuples.map((tuple) => {
      return new GetPostedList(
        tuple.postId,
        tuple.type,
        tuple.recruitEndAt,
        tuple.progressWay,
        tuple.title,
        tuple.position,
        tuple.stack,
        tuple.nickname,
        tuple.profileImageUrl,
      );
    });
    return new GetPostListDto(postedListInfo);
  }
}



export class GetPostedList {
  postId!: number;
  type!: Type;
  recruitEndAt!: string;
  progressWay!: string;
  title!: string;
  position!: string[];
  stack: string[];
  nickname: string;
  profileImageUrl: string;
  // postViews: number;
  // postCommentsNum: number;

  constructor(
    postId: number,
    type: Type,
    recruitEndAt: string,
    progressWay: string,
    title: string,
    position: string[],
    stack: string[],
    nickname: string,
    profileImageUrl: string,
    // postViews: number,
    // postCommentsNum: number,
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
    // this.postViews = postViews;
    // this.postCommentsNum = postCommentsNum;
  }

}
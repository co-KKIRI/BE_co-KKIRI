import { PostApplyStatus, Type } from "src/entity/common/Enums";
import { GetAllPostDetailTuple } from "src/repository/post-detail.query-repository";

export class GetPostDetailDto {
  postDetail!: GetPostDetails;
  postApplyStatus!: PostApplyStatus;

  constructor(postDetail: GetPostDetails, postApplyStatus: PostApplyStatus) {
    this.postDetail = postDetail;
    this.postApplyStatus = postApplyStatus;
  }
  static from(tuple: GetAllPostDetailTuple, postApplyStatus: PostApplyStatus) {
    const postDetail = new GetPostDetails(
      tuple.postTitle,
      tuple.postMemberId,
      tuple.postContent,
      tuple.userProfileImg,
      tuple.userNickname,
      tuple.createdAt,
      tuple.type,
      tuple.recruitEndAt,
      tuple.progressPeriod,
      tuple.progressWay,
      tuple.contactWay,
      tuple.capacity,
      tuple.positions,
      tuple.stacks,
      tuple.link,
      tuple.isScraped,
      tuple.viewCount,
      tuple.scrapCount,
      tuple.commentCount,
    );
    return new GetPostDetailDto(postDetail, postApplyStatus);
  }
}

export class GetPostDetails {
  postTitle!: string;
  postMemberId!: number;
  postContent: string;
  userProfileImg: string;
  userNickname: string;
  createdAt!: Date;
  type!: Type;
  recruitEndAt: Date;
  progressPeriod: string;
  progressWay: string;
  contactWay: string;
  capacity: number;
  positions: string[];
  stacks: string[];
  link: string;
  isScraped!: boolean;
  viewCount!: number;
  scrapCount!: number;
  commentCount: number;

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
    stack: string[],
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
    this.stacks = stack;
    this.link = link;
    this.isScraped = isScraped;
    this.viewCount = viewCount;
    this.scrapCount = scrapCount;
    this.commentCount = commentCount;
  }
}
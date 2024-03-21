import { Type } from "src/entity/common/Enums";
import { GetAllPostDetailTuple } from "src/repository/post-detail.query-repository";

export class GetPostDetailDto {
  postDetail!: GetPostDetails;

  constructor(postDetail: GetPostDetails) {
    this.postDetail=postDetail;
  }
  static from(tuple: GetAllPostDetailTuple){
    const postDetail = new GetPostDetails(
      tuple.postTitle,
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
    );
    return new GetPostDetailDto(postDetail);
  }
}

export class GetPostDetails {
  postTitle!: string;
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
  }
}
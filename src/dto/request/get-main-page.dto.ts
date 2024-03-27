import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";

export class GetMainPageDto {
  newStudyLists!: GetMainPostLists[];
  hotStudyLists!: GetMainPostLists[];
  newProjectLists!: GetMainPostLists[];
  hotProjectLists!: GetMainPostLists[];

  constructor(
    newStudyLists: GetMainPostLists[],
    hotStudyLists: GetMainPostLists[],
    newProjectLists: GetMainPostLists[],
    hotProjectLists: GetMainPostLists[]
  ) {
    this.newStudyLists = newStudyLists;
    this.hotStudyLists = hotStudyLists;
    this.newProjectLists = newProjectLists;
    this.hotProjectLists = hotProjectLists;
  }

  static from(
    newStudyLists: GetMainPostLists[],
    hotStudyLists: GetMainPostLists[],
    newProjectLists: GetMainPostLists[],
    hotProjectLists: GetMainPostLists[],
  ) {
    const allLists = [
      ...newStudyLists,
      ...hotStudyLists,
      ...newProjectLists,
      ...hotProjectLists,
    ];
    return allLists.map(
      (getPostLists) =>
        new GetMainPostLists(
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
export class GetMainPostLists {
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
}
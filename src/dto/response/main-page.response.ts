import { ApiProperty } from "@nestjs/swagger";
import { Type } from "src/entity/common/Enums";
import { GetPostedList } from "../get-post-list.dto";
import { GetMainPageDto, GetMainPostLists } from "../request/get-main-page.dto";

export class MainPostLists {
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




export class MainPostResponse {
  @ApiProperty({ type: MainPostLists })
  newStudyLists!: MainPostLists[];
  @ApiProperty({ type: MainPostLists })
  hotStudyLists!: MainPostLists[];
  @ApiProperty({ type: MainPostLists })
  newProjectLists!: MainPostLists[];
  @ApiProperty({ type: MainPostLists })
  hotProjectLists!: MainPostLists[];
  constructor(
    newStudyLists: MainPostLists[],
    hotStudyLists: MainPostLists[],
    newProjectLists: MainPostLists[],
    hotProjectLists: MainPostLists[]
  ) {
    this.newStudyLists = newStudyLists;
    this.hotStudyLists = hotStudyLists;
    this.newProjectLists = newProjectLists;
    this.hotProjectLists = hotProjectLists;
  }
  static from(
    newStudyDto: GetMainPostLists[],
    hotStudyDto: GetMainPostLists[],
    newProjectDto: GetMainPostLists[],
    hotProjectDto: GetMainPostLists[],
  ) {
    return new MainPostResponse(
      newStudyDto.map(item =>
        new MainPostLists(
          item.postId,
          item.type,
          item.recruitEndAt,
          item.progressWay,
          item.title,
          item.positions,
          item.stacks,
          item.nickname,
          item.profileImageUrl,
          item.viewCount,
          item.commentCount,
          item.isScraped
        )
      ),
      hotStudyDto.map(item =>
        new MainPostLists(
          item.postId,
          item.type,
          item.recruitEndAt,
          item.progressWay,
          item.title,
          item.positions,
          item.stacks,
          item.nickname,
          item.profileImageUrl,
          item.viewCount,
          item.commentCount,
          item.isScraped
        )
      ),
      newProjectDto.map(item =>
        new MainPostLists(
          item.postId,
          item.type,
          item.recruitEndAt,
          item.progressWay,
          item.title,
          item.positions,
          item.stacks,
          item.nickname,
          item.profileImageUrl,
          item.viewCount,
          item.commentCount,
          item.isScraped
        )
      ),
      hotProjectDto.map(item =>
        new MainPostLists(
          item.postId,
          item.type,
          item.recruitEndAt,
          item.progressWay,
          item.title,
          item.positions,
          item.stacks,
          item.nickname,
          item.profileImageUrl,
          item.viewCount,
          item.commentCount,
          item.isScraped
        )
      )
    );
  }
}

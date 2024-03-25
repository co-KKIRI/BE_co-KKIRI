import { Type } from 'src/entity/common/Enums';
import { GetMyPageScrapTuple } from 'src/repository/my-page.query-repository';

export class GetMyPageScrapResponse {
  postId: number;
  type: Type;
  recruitEndAt?: string;
  isScraped?: boolean;
  progressWay?: string;
  title?: string;
  position?: string[];
  stack?: string[];
  memberNickname?: string;
  memberProfileImageUrl?: string;
  viewCount?: number;
  commentCount?: number;

  constructor(
    postId: number,
    type: Type,
    recruitEndAt?: string,
    isScraped?: boolean,
    progressWay?: string,
    title?: string,
    position?: string[],
    stack?: string[],
    memberNickname?: string,
    memberProfileImageUrl?: string,
    viewCount?: number,
    commentCount?: number,
  ) {
    this.postId = postId;
    this.type = type;
    this.recruitEndAt = recruitEndAt;
    this.isScraped = isScraped;
    this.progressWay = progressWay;
    this.title = title;
    this.position = position;
    this.stack = stack;
    this.memberNickname = memberNickname;
    this.memberProfileImageUrl = memberProfileImageUrl;
    this.viewCount = viewCount;
    this.commentCount = commentCount;
  }

  static from(tuple: GetMyPageScrapTuple) {
    return new GetMyPageScrapResponse(
      tuple.postId,
      tuple.type,
      tuple.recruitEndAt,
      tuple.isScraped,
      tuple.progressWay,
      tuple.title,
      JSON.parse(tuple.position ?? JSON.stringify([])),
      JSON.parse(tuple.stack ?? JSON.stringify([])),
      tuple.memberNickname,
      tuple.memberProfileImageUrl,
      tuple.viewCount,
      tuple.commentCount,
    );
  }
}

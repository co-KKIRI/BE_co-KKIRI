import { GetAllPostCommentTuple } from "src/repository/post-detail.query-repository";

export class GetPostCommentDto {
  commentInfo!: GetPostComment[];

  constructor(commentInfo: GetPostComment[]) {
    this.commentInfo = commentInfo;
  }

  static from(tuples: GetAllPostCommentTuple[], leaderMemberId: number) {
    const commentInfo = tuples.map((tuple) => {
      return GetPostComment.from(tuple, leaderMemberId);
    });
    return new GetPostCommentDto(commentInfo);
  }
}

export class GetPostComment {
  isMine!: boolean;
  commentId!: number;
  commentCreatedAt!: Date;
  commentProfileImg?: string;
  commentNickname?: string;
  commentContent?: string;

  constructor(
    leaderMemberId: number,
    commentId: number,
    commentMemberId: number,
    commentCreatedAt: Date,
    commentProfileImg?: string,
    commentNickname?: string,
    commentContent?: string,
  ) {
    this.isMine = leaderMemberId === commentMemberId;
    this.commentId = commentId;
    this.commentCreatedAt = commentCreatedAt;
    this.commentProfileImg = commentProfileImg;
    this.commentNickname = commentNickname;
    this.commentContent = commentContent;
  }

  static from(tuple: GetAllPostCommentTuple, leaderMemberId: number) {
    return new GetPostComment(
      leaderMemberId,
      tuple.commentId,
      tuple.commentMemberId,
      tuple.commentCreatedAt,
      tuple.commentProfileImg,
      tuple.commentNickname,
      tuple.commentContent,
    );
  }
}
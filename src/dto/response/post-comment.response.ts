import { ApiProperty } from "@nestjs/swagger";
import { GetPostComment } from "../get-post-comment.dto";

export class PostCommentResponse {
  @ApiProperty()
  commentId!: number;
  @ApiProperty()
  commentMemberId!: number;
  @ApiProperty()
  commentProfileImg?: string;
  @ApiProperty()
  commentNickname?: string;
  @ApiProperty()
  commentCreatedAt!: Date;
  @ApiProperty()
  commentContent?: string;
  @ApiProperty()
  isMine!: boolean;

  constructor(
    isMine: boolean,
    commentId: number,
    commentMemberId: number,
    commentCreatedAt: Date,
    commentProfileImg?: string,
    commentNickname?: string,
    commentContent?: string,
  ) {
    this.isMine = isMine;
    this.commentId = commentId;
    this.commentMemberId = commentMemberId;
    this.commentCreatedAt = commentCreatedAt;
    this.commentProfileImg = commentProfileImg;
    this.commentNickname = commentNickname;
    this.commentContent = commentContent;
  }
  static fromList(getPostComment: GetPostComment[]) {
    return getPostComment.map((getPostComment) =>
      new PostCommentResponse(
        getPostComment.isMine,
        getPostComment.commentId,
        getPostComment.commentMemberId,
        getPostComment.commentCreatedAt,
        getPostComment.commentProfileImg,
        getPostComment.commentNickname,
        getPostComment.commentContent,
      ),
    );
  }

}
export class GetTeamInviteInfoResponse {
  sendMemberId: number;
  sendMemberNickname: string;
  postId: string;
  postTitle: string;
  message: string;

  constructor(sendMemberId: number, sendMemberNickname: string, postId: string, postTitle: string, message: string) {
    this.sendMemberId = sendMemberId;
    this.sendMemberNickname = sendMemberNickname;
    this.postId = postId;
    this.postTitle = postTitle;
    this.message = message;
  }
}

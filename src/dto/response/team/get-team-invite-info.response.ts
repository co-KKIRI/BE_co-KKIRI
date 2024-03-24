export class GetTeamInviteInfoResponse {
  sendMemberId: number;
  sendMemberNickname: string;
  postId: string;
  postTitle: string;
  message: string;
  teamMemberId: number;

  constructor(
    sendMemberId: number,
    sendMemberNickname: string,
    postId: string,
    postTitle: string,
    message: string,
    teamMemberId: number,
  ) {
    this.sendMemberId = sendMemberId;
    this.sendMemberNickname = sendMemberNickname;
    this.postId = postId;
    this.postTitle = postTitle;
    this.message = message;
    this.teamMemberId = teamMemberId;
  }
}

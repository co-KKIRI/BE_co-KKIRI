import { GetMyPageInviteTuple } from 'src/repository/my-page.query-repository';

export class GetMyPageInviteResponse {
  postId: number;
  teamInviteId: number;
  title: string;

  constructor(postId: number, teamInviteId: number, title: string) {
    this.postId = postId;
    this.teamInviteId = teamInviteId;
    this.title = title;
  }

  static from(tuple: GetMyPageInviteTuple) {
    return new GetMyPageInviteResponse(tuple.postId, tuple.teamInviteId, tuple.title);
  }
}

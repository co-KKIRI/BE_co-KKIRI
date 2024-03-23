import { GetMyPageInviteTuple } from 'src/repository/my-page.query-repository';

export class GetMyPageInviteResponse {
  id: number;
  title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  static from(tuple: GetMyPageInviteTuple) {
    return new GetMyPageInviteResponse(tuple.id, tuple.title);
  }
}

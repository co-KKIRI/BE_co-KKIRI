import { ScoutPostTuple } from '../repository/scout.query-repository';

export class GetScoutPostDto {
  postId!: number;
  title?: string;

  constructor(postId: number, title?: string) {
    this.postId = postId;
    this.title = title;
  }

  static from(tuple: ScoutPostTuple) {
    return new GetScoutPostDto(tuple.postId, tuple.title);
  }
}

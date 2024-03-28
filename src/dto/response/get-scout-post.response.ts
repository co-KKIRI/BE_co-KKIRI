import { ApiProperty } from '@nestjs/swagger';
import { GetScoutPostDto } from '../get-scout-post.dto';

export class GetScoutPostResponse {
  @ApiProperty()
  postId!: number;
  @ApiProperty()
  title?: string;

  constructor(postId: number, title?: string) {
    this.postId = postId;
    this.title = title;
  }

  static from(tuple: GetScoutPostDto): GetScoutPostResponse {
    return new GetScoutPostResponse(tuple.postId, tuple.title);
  }
}

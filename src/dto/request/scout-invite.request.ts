import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class ScoutInviteRequest {
  @ApiProperty()
  @IsNumber()
  postId!: number;

  @ApiProperty()
  @IsNumber()
  memberId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(200, { message: '초대 메시지는 200자 이하로 입력해주세요.' })
  message!: string;
}

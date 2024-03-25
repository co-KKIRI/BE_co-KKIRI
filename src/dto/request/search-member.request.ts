import { PaginationRequest } from '../../common/pagination/pagination-request';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchMemberRequest extends PaginationRequest {
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '닉네임' })
  nickname?: string;

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '스택' })
  stacks?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '포지션' })
  position?: string;
}

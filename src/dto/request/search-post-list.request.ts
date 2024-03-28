import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { PostListSortBy, PostListType } from "src/entity/common/Enums";

export class SearchPostList extends PaginationRequest {
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '포스트 타입' })
  meetingType?: PostListType;

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '포지션' })
  position?: string;

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '진행 방식' })
  progressWay?: string;

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '스택' })
  stacks?: string[];

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '정렬 기준' })
  sortBy?: PostListSortBy;

  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '제목 검색' })
  search?: string;
}
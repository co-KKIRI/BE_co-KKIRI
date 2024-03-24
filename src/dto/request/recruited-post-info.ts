import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Type } from "src/entity/common/Enums";

export class RecruitedPostInfoDto {
  @ApiProperty()
  @IsEnum(Type)
  type!: Type;

  @ApiProperty()
  @IsDateString()
  recruitEndAt!: Date;

  @ApiProperty()
  @IsString()
  progressPeriod!: string;

  @ApiProperty()
  @IsNumber()
  capacity!: number;

  @ApiProperty()
  @IsString()
  contactWay!: string;

  @ApiProperty()
  @IsString()
  progressWay!: string;

  @ApiProperty()
  @IsArray()
  stacks!: string[];

  @ApiProperty()
  @IsArray()
  positions!: string[];

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  content!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  link?: string;

  constructor(
    type: Type,
    recruitEndAt: Date,
    progressPeriod: string,
    capacity: number,
    contactWay: string,
    progressWay: string,
    stacks: string[],
    positions: string[],
    title: string,
    content: string,
    link?: string,
  ) {
    this.type = type;
    this.recruitEndAt = recruitEndAt;
    this.progressPeriod = progressPeriod;
    this.capacity = capacity;
    this.contactWay = contactWay;
    this.progressWay = progressWay;
    this.stacks = stacks;
    this.positions = positions;
    this.title = title;
    this.content = content;
    this.link = link;
  }
}
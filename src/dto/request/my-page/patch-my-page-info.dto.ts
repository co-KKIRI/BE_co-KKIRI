import { IsArray, IsOptional, IsString } from 'class-validator';

export class PatchMyPageInfoDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  career?: number;

  @IsOptional()
  @IsString()
  introduce?: string;

  @IsOptional()
  @IsArray()
  stack?: string[];

  @IsOptional()
  @IsString()
  link?: string;

  constructor(
    nickname?: string,
    profileImageUrl?: string,
    position?: string,
    career?: number,
    introduce?: string,
    stack?: string[],
    link?: string,
  ) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.position = position;
    this.career = career;
    this.introduce = introduce;
    this.stack = stack;
    this.link = link;
  }
}

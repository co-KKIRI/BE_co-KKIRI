import { IsOptional, IsString } from 'class-validator';

export class PatchFCMInfoDto {
  @IsString()
  tokenId: string;

  @IsOptional()
  @IsString()
  device?: string;

  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  @IsString()
  browser?: string;

  constructor(tokenId: string, device?: string, os?: string, browser?: string) {
    this.tokenId = tokenId;
    this.device = device;
    this.os = os;
    this.browser = browser;
  }
}

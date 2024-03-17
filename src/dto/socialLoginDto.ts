import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SocialProvider } from 'src/entity/common/SocialProvider';

export class SocialLoginDto {
  @IsEnum(SocialProvider)
  socialProvider: SocialProvider;

  @IsString()
  externalId: string;
}

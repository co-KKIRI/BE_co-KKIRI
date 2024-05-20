import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-kakao';
import { SocialLoginDto } from 'src/dto/socialLoginDto';
import { SocialProvider } from 'src/entity/common/SocialProvider';
import { KakaoAuthenticationService } from 'src/service/kakao-authentication.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly kakaoAuthService: KakaoAuthenticationService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { id, displayName, username, _json } = profile;

    const socialLoginInfo: SocialLoginDto = {
      nickname: displayName ?? username,
      profileImageUrl: _json.properties.profile_image ?? '',
      socialProvider: SocialProvider.KAKAO,
      externalId: id,
    };

    try {
      const member = await this.kakaoAuthService.validateAndSaveUser(socialLoginInfo);
      member['accessToken'] = accessToken;

      done(null, member, accessToken);
    } catch (err) {
      done(err, false);
    }
  }
}

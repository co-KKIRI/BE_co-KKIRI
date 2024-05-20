import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-github2';
import { SocialLoginDto } from 'src/dto/socialLoginDto';
import { SocialProvider } from 'src/entity/common/SocialProvider';
import { GithubAuthenticationService } from 'src/service/github-authentication.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly githubAuthService: GithubAuthenticationService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { id, displayName, username, photos } = profile;

    const socialLoginInfo: SocialLoginDto = {
      nickname: displayName ?? username,
      profileImageUrl: photos[0].value ?? '',
      socialProvider: SocialProvider.GITHUB,
      externalId: id,
    };

    try {
      const member = await this.githubAuthService.validateAndSaveUser(socialLoginInfo);
      member['accessToken'] = accessToken;

      done(null, member, accessToken);
    } catch (err) {
      done(err, false);
    }
  }
}

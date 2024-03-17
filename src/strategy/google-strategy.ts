import { GoogleAuthenticationService } from './../service/google-authentication.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SocialLoginDto } from 'src/dto/socialLoginDto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly googleAuthService: GoogleAuthenticationService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [process.env.GOOGLE_SCOPE_PROFILE, process.env.GOOGLE_SCOPE_EMAIL],
    });
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { name, emails, provider } = profile;
    // const socialLoginUserInfo: SocialLoginInfoDto = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   socialProvider: provider,
    //   externalId: profile.id,
    //   accessToken,
    //   refreshToken,
    // };

    const socialLoginInfo: SocialLoginDto = {
      socialProvider: provider,
      externalId: profile.id,
    };

    console.log(profile);

    try {
      const member = await this.googleAuthService.validateAndSaveUser(socialLoginInfo);
      console.log(member, 'strategy');
      done(null, member, accessToken);
    } catch (err) {
      done(err, false);
    }
  }
}

import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/guard/google-auth.guard';

@Controller('auth/google')
export class GoogleAuthenticationController {
  constructor() {}

  // login 라우트 핸들러
  @Get('/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return {
      msg: 'Google Authentication',
    };
  }

  // login 성공 시, redirect를 수행할 라우트 핸들러
  @Get('/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res: Response) {
    // const googleToken = req.user.accessToken;
    // const googleRefreshToken = req.user.refreshToken;

    // res.cookie('access_token', googleToken, { httpOnly: true });
    // res.cookie('refresh_token', googleRefreshToken, {
    //   httpOnly: true,
    // });

    // res.redirect('http://localhost:3000/auth/profile');

    res.cookie('test2', 'test2', { httpOnly: true, domain: 'localhost' });

    console.log(req.session, ' redirect');
    console.log(req.user, ' redirect');

    return res.json();
  }

  // session 저장에 따른 유저 객체 인증/인가 테스트
  @Get('/status')
  async user(@Req() req) {
    console.log(req.session, ' status');

    if (req.user) {
      console.log(req.user, 'Authenticated User');
      return {
        msg: 'Authenticated',
      };
    } else {
      console.log(req.user, 'User cannot found');
      return {
        msg: 'Not Authenticated',
      };
    }
  }
}

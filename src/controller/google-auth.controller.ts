import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
  async handleRedirect(@Req() req: any) {
    return req.user;
  }

  // session 저장에 따른 유저 객체 인증/인가 테스트
  @Get('/status')
  async user(@Req() req: any) {
    console.log(req.cookies);
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

import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/guard/google-auth.guard';

@ApiTags('GoogleAuth')
@Controller('auth/google')
export class GoogleAuthenticationController {
  constructor() {}

  @ApiOperation({ summary: '구글 로그인 시도' })
  @Get('/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return {
      msg: 'Google Authentication',
    };
  }

  @ApiOperation({ summary: '구글 로그인 후 처리' })
  @Post('/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect() {}
}

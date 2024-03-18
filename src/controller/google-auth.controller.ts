import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/guard/google-auth.guard';

@Controller('auth/google')
export class GoogleAuthenticationController {
  constructor() {}

  @Get('/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return {
      msg: 'Google Authentication',
    };
  }

  @Get('/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect() {}
}

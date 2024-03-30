import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/roles/roles.decorator';
import { GoogleAuthGuard } from 'src/guard/google-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

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

  // roles guard test
  @Get('/test')
  @UseGuards(RolesGuard)
  @Roles('anyone')
  async handleAuthTest() {
    console.log('test');
  }

  @Get('/test1')
  @UseGuards(RolesGuard)
  async handleAuthTest1() {
    console.log('test');
  }
}

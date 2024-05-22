import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KakaoAuthGuard } from 'src/guard/kakao-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

@ApiTags('KakaoAuth')
@Controller('auth/kakao')
export class KakaoAuthenticationController {
  constructor() {}

  @ApiOperation({ summary: '카카오 로그인 시도' })
  @Get('/login')
  @UseGuards(KakaoAuthGuard)
  async handleLogin() {}

  @ApiOperation({ summary: '카카오 로그인 후 처리' })
  @Post('/redirect')
  @UseGuards(KakaoAuthGuard)
  async handleRedirect() {}
}

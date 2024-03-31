import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GithubAuthGuard } from 'src/guard/github-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

@ApiTags('GithubAuth')
@Controller('auth/github')
export class GithubAuthenticationController {
  constructor() {}

  @ApiOperation({ summary: '깃허브 로그인 시도' })
  @Get('/login')
  @UseGuards(GithubAuthGuard)
  async handleLogin() {}

  @ApiOperation({ summary: '깃허브 로그인 후 처리' })
  @Post('/redirect')
  @UseGuards(GithubAuthGuard)
  async handleRedirect() {}
}

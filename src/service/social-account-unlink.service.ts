import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';

@Injectable()
export class UnlinkService {
  async unlink(socialProvider: string, accessToken: string): Promise<void> {
    switch (socialProvider) {
      case 'GOOGLE':
        await this.googleUnlink(accessToken);
        break;
      case 'GITHUB':
        await this.githubUnlink(accessToken);
        break;
      case 'KAKAO':
        await this.kakaoUnlink(accessToken);
        break;
      default:
        throw new BadRequestException('정의되지 않은 socialProvider입니다.');
    }
  }

  private async googleUnlink(accessToken: string): Promise<void> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      const response = await fetch(`https://accounts.google.com/o/oauth2/revoke?toke=${accessToken}`, options);
      if (!response.ok) {
        throw new InternalServerErrorException('구글 계정 연결 해제에 실패했습니다.');
      }
    } catch (err) {
      throw new InternalServerErrorException('구글 계정 연결 해제 중 오류가 발생했습니다.');
    }
  }

  private async githubUnlink(accessToken: string): Promise<void> {
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
    const authString = Buffer.from(`${GITHUB_CLIENT_ID}:${GITHUB_CLIENT_SECRET}`).toString('base64');

    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Basic ${authString}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken }),
    };
    try {
      const response = await fetch(`https://api.github.com/applications/${GITHUB_CLIENT_ID}/grant`, options);
      if (!response.ok) {
        throw new InternalServerErrorException('깃허브 계정 연결 해제에 실패했습니다.');
      }
    } catch (err) {
      throw new InternalServerErrorException('깃허브 계정 연결 해제 중 오류가 발생했습니다.');
    }
  }

  private async kakaoUnlink(accessToken: string): Promise<void> {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch('https://kapi.kakao.com/v1/user/unlink', options);
      if (!response.ok) {
        throw new InternalServerErrorException('카카오 계정 연결 해제에 실패했습니다.');
      }
    } catch (err) {
      throw new InternalServerErrorException('카카오 계정 연결 해제 중 오류가 발생했습니다.');
    }
  }
}

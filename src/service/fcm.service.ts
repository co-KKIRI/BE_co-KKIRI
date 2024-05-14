import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchFCMInfoDto } from 'src/dto/request/fcm/patch-fcm.dto';
import { FCMToken } from 'src/entity/fcm-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FCMService {
  constructor(@InjectRepository(FCMToken) private readonly fcmTokenRepository: Repository<FCMToken>) {}

  async saveToken(memberId: number, tokenInfo: PatchFCMInfoDto) {
    const { tokenId, device, os, browser } = tokenInfo;

    const token = await this.fcmTokenRepository.findOneBy({
      memberId,
      device,
      os,
      browser,
    });

    if (token) {
      token.tokenId = tokenId;
      await this.fcmTokenRepository.save(token);
    } else {
      const newToken = new FCMToken();

      newToken.memberId = memberId;
      newToken.tokenId = tokenId;
      newToken.device = device;
      newToken.os = os;
      newToken.browser = browser;

      await this.fcmTokenRepository.save(newToken);
    }
  }
}

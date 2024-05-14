import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PatchFCMInfoDto } from 'src/dto/request/fcm/patch-fcm.dto';
import { RolesGuard } from 'src/guard/roles.guard';
import { FCMService } from 'src/service/fcm.service';

@Controller('fcm')
@UseGuards(RolesGuard)
export class FcmController {
  constructor(private readonly fcmService: FCMService) {}

  @ApiOperation({ summary: '유저 fcm 토큰 저장' })
  @Patch()
  async saveOrUpdateToken(@Req() req, @Body() tokenInfo: PatchFCMInfoDto): Promise<void> {
    await this.fcmService.saveToken(req.user.id, tokenInfo);
  }
}

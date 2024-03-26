import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { ScoutService } from '../service/scout.service';
import { PaginationResponse } from '../common/pagination/pagination-response';
import { GetScoutPostDto } from '../dto/get-scout-post.dto';
import { GetScoutPostResponse } from '../dto/response/get-scout-post.response';
import { RolesGuard } from '../guard/roles.guard';

@UseGuards(RolesGuard)
@ApiTags('Scout')
@Controller('scout')
export class ScoutController {
  constructor(private readonly scoutService: ScoutService) {}

  @Get('post')
  async getScoutPostList(@Req() req, @Query() paginationRequest: PaginationRequest) {
    const { getScoutPostDtoList, totalCount } = await this.scoutService.getScoutPostList(
      paginationRequest,
      req.user.id,
    );

    return PaginationResponse.of({
      data: getScoutPostDtoList.map(GetScoutPostResponse.from),
      options: paginationRequest,
      totalCount: totalCount,
    });
  }

  @Post('invite')
  async invite() {}
}

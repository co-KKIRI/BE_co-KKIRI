import { Controller, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { PostManagementResponse } from '../dto/response/post-management.response';
import { PostApplyResponse } from '../dto/response/post-apply.response';
import { PostManagementService } from '../service/post-management.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { PaginationResponse } from '../common/pagination/pagination-response';
import { ApiPaginatedResponse } from '../common/pagination/pagination.decorator';

@ApiTags('PostManagement')
@Controller('post')
export class PostManagementController {
  constructor(private readonly postManagementService: PostManagementService) {}

  @ApiOperation({ summary: '스터디 정보' })
  @ApiCreatedResponse({ type: PostManagementResponse })
  @Get(':postId/management')
  async getPostManagement(@Param('postId', ParseIntPipe) postId: number): Promise<PostManagementResponse> {
    const getPostManagementDto = await this.postManagementService.getPostManagement(postId);
    return PostManagementResponse.from(getPostManagementDto);
  }

  @ApiOperation({ summary: '스터디 신청자 목록' })
  @ApiPaginatedResponse(PostApplyResponse)
  @Get(':postId/apply')
  async getPostApply(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() paginationRequest: PaginationRequest,
  ): Promise<PaginationResponse<PostApplyResponse>> {
    const { getAppliedPostMembers, totalCount } = await this.postManagementService.getPostApply(
      postId,
      paginationRequest,
    );
    return PaginationResponse.of({
      data: PostApplyResponse.fromList(getAppliedPostMembers),
      options: paginationRequest,
      totalCount,
    });
  }

  @ApiOperation({ summary: '스터디 모집 마감' })
  @Patch(':postId/recruit-end')
  async recruitEnd(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.postManagementService.recruitEnd(postId);
  }

  @ApiOperation({ summary: '스터디 모집 시작' })
  @Patch(':postId/recruit-start')
  async recruitStart(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.postManagementService.recruitStart(postId);
  }

  @ApiOperation({ summary: '스터디 모집 완료' })
  @Patch(':postId/recruit-complete')
  async recruitComplete(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.postManagementService.recruitComplete(postId);
  }
}

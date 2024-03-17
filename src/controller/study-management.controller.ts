import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudyManagementResponse } from '../dto/response/study-management.response';
import { StudyApplyResponse } from '../dto/response/study-apply.response';
import { StudyManagementService } from '../service/study-management.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('StudyManagement')
@Controller('study')
export class StudyManagementController {
  constructor(private readonly studyManagementService: StudyManagementService) {}

  @ApiOperation({ summary: '스터디 정보' })
  @ApiCreatedResponse({ type: StudyManagementResponse })
  @Get(':postId/management')
  async getStudyManagement(@Param('postId', ParseIntPipe) postId: number): Promise<StudyManagementResponse> {
    const getStudyManagementDto = await this.studyManagementService.getStudyManagement(postId);
    return StudyManagementResponse.from(getStudyManagementDto);
  }

  @ApiOperation({ summary: '스터디 신청자 목록' })
  @ApiCreatedResponse({ type: StudyApplyResponse })
  @Get(':postId/apply')
  async getStudyApply(@Param('postId', ParseIntPipe) postId: number): Promise<StudyApplyResponse> {
    const studyApply = await this.studyManagementService.getStudyApply(postId);
    return StudyApplyResponse.from(studyApply);
  }

  @ApiOperation({ summary: '스터디 모집 마감' })
  @Patch(':postId/recruit-end')
  async recruitEnd(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.studyManagementService.recruitEnd(postId);
  }

  @ApiOperation({ summary: '스터디 모집 시작' })
  @Patch(':postId/recruit-start')
  async recruitStart(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.studyManagementService.recruitStart(postId);
  }

  @ApiOperation({ summary: '스터디 모집 완료' })
  @Patch(':postId/recruit-complete')
  async recruitComplete(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.studyManagementService.recruitComplete(postId);
  }
}

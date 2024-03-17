import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudyManagementResponse } from '../dto/response/study-management.response';
import { StudyApplyResponse } from '../dto/response/study-apply.response';
import { StudyManagementService } from '../service/study-management.service';

@Controller('study')
export class StudyManagementController {
  constructor(private readonly studyManagementService: StudyManagementService) {}

  @Get(':postId/management')
  async getStudyManagement(@Param('postId', ParseIntPipe) postId: number): Promise<StudyManagementResponse> {
    const getStudyManagementDto = await this.studyManagementService.getStudyManagement(postId);
    return StudyManagementResponse.from(getStudyManagementDto);
  }

  @Get(':postId/apply')
  async getStudyApply(@Param('postId', ParseIntPipe) postId: number): Promise<StudyApplyResponse> {
    const studyApply = await this.studyManagementService.getStudyApply(postId);
    return StudyApplyResponse.from(studyApply);
  }

  @Patch(':postId/recruit-end')
  async recruitEnd(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.studyManagementService.recruitEnd(postId);
  }

  @Patch(':postId/recruit-start')
  async recruitStart(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.studyManagementService.recruitStart(postId);
  }

  @Patch(':postId/recruit-complete')
  async recruitComplete(@Param('postId', ParseIntPipe) postId: number): Promise<void> {
    await this.studyManagementService.recruitComplete(postId);
  }
}

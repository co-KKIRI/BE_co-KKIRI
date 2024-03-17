import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudyManagementResponse } from '../dto/response/study-management.response';
import { StudyApplyResponse } from '../dto/response/study-apply.response';

@Controller()
export class StudyManagementController {
  constructor() {}

  @Get('/study/:postId/management')
  getStudyManagement(@Param('postId', ParseIntPipe) postId: number): StudyManagementResponse {
    return;
  }

  @Get('/study/:postId/apply')
  getStudyApply(@Param('postId', ParseIntPipe) postId: number): StudyApplyResponse {
    return;
  }

  @Patch('/study/:postId/recruit-end')
  recruitEnd(@Param('postId', ParseIntPipe) postId: number): void {
    return;
  }

  @Patch('/study/:postId/recruit-start')
  recruitStart(@Param('postId', ParseIntPipe) postId: number): void {
    return;
  }

  @Patch('/study/:postId/recruit-complete')
  recruitComplete(@Param('postId', ParseIntPipe) postId: number): void {
    return;
  }
}

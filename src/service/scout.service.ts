import { Injectable } from '@nestjs/common';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { ScoutQueryRepository } from '../repository/scout.query-repository';
import { GetScoutPostDto } from '../dto/get-scout-post.dto';

@Injectable()
export class ScoutService {
  constructor(private readonly scoutQueryRepository: ScoutQueryRepository) {}

  async getScoutPostList(paginationRequest: PaginationRequest, memberId: number) {
    const scoutPostTuples = await this.scoutQueryRepository.getScoutPostList(paginationRequest, memberId);
    const totalCount = await this.scoutQueryRepository.getScoutPostListTotalCount(memberId);

    const getScoutPostDtoList = scoutPostTuples.map(GetScoutPostDto.from);
    return { getScoutPostDtoList, totalCount };
  }

  async invite() {}
}

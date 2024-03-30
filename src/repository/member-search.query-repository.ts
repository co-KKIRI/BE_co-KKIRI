import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { Member } from '../entity/member.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MemberSearchQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async searchMember(request: PaginationRequest, stacks: string[], position?: string, nickname?: string) {
    const searchedMember = await this.baseQuery(stacks, position, nickname)
      .select([
        'member.id as memberId',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'member.position as position',
        'member.career as career',
        'member.stack as stacks',
      ])
      .orderBy('member.updatedAt', request.order)
      .offset(request.getSkip())
      .limit(request.take)
      .getRawMany();

    return plainToInstance(SearchedMemberTuple, searchedMember);
  }

  async searchMemberTotalCount(stacks: string[], position?: string, nickname?: string) {
    return await this.baseQuery(stacks, position, nickname).getCount();
  }

  private baseQuery(stacks: string[], position?: string, nickname?: string) {
    let query = this.dataSource.createQueryBuilder().from(Member, 'member');

    if (position) {
      query = query.where('member.position = :position', { position });
    }
    if (nickname) {
      query = query.andWhere('member.nickname like :nickname', { nickname: `%${nickname}%` });
    }
    if (stacks.length > 0) {
      query = query.andWhere('member.stack in (:...stacks)', { stacks });
    }
    return query;
  }
}

export class SearchedMemberTuple {
  memberId!: number;
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
  career?: number;
  stacks?: string;
}

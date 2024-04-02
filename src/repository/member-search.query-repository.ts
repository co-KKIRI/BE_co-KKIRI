import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Brackets, DataSource } from 'typeorm';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { Member } from '../entity/member.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MemberSearchQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async searchMember(
    request: PaginationRequest,
    mineMemberId: number,
    stacks: string[],
    position?: string,
    nickname?: string,
  ) {
    const searchedMember = await this.baseQuery(stacks, mineMemberId, position, nickname)
      .select([
        'member.id as memberId',
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'member.position as position',
        'member.career as career',
        'member.stack as stacks',
        'member.gauge as gauge'
      ])
      .orderBy('member.updatedAt', request.order)
      .offset(request.getSkip())
      .limit(request.take)
      .getRawMany();

    return plainToInstance(SearchedMemberTuple, searchedMember);
  }

  async searchMemberTotalCount(stacks: string[], mineMemberId: number, position?: string, nickname?: string) {
    return await this.baseQuery(stacks, mineMemberId, position, nickname).getCount();
  }

  private baseQuery(stacks: string[], mineMemberId: number, position?: string, nickname?: string) {
    let query = this.dataSource.createQueryBuilder().from(Member, 'member');

    query.where('member.isVisibleProfile = true');
    query.andWhere('member.id != :mineMemberId', { mineMemberId });
    query.andWhere('member.deletedAt is null');

    if (position) {
      query.andWhere('member.position = :position', { position });
    }
    if (nickname) {
      query.andWhere('member.nickname like :nickname', { nickname: `%${nickname}%` });
    }
    if (stacks.length > 0) {
      query.andWhere(
        new Brackets((qb) => {
          stacks.forEach((stack, _) => {
            qb.orWhere('member.stack like :stack', { stack: `%${stack}%` });
          });
        }),
      );
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
  gauge: number;
}

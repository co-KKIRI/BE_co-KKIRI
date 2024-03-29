import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from 'src/entity/member.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MemberQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getMember(externalId: string): Promise<Member | undefined> {
    const member = await this.dataSource
      .createQueryBuilder()
      .from(Member, 'member')
      .where('member.externalId = :externalId', { externalId })
      .andWhere('member.deletedAt IS NULL')
      .getRawOne();

    return plainToInstance(Member, member);
  }

  async getMemberInfoSummary(id: number) {
    const memberInfoSummary = await this.dataSource
      .createQueryBuilder()
      .from(Member, 'member')
      .where('member.id = :id', { id })
      .select(['member.nickname as nickname', 'member.profileImageUrl as profileImageUrl'])
      .getRawOne();

    return plainToInstance(GetMemberInfoSummaryTuple, memberInfoSummary);
  }
}

export class GetMemberInfoSummaryTuple {
  nickname?: string;
  profileImageUrl?: string;
}

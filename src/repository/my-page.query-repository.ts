import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from 'src/entity/member.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MyPageQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getMyPageInfo(id: number) {
    const mypageInfo = await this.dataSource
      .createQueryBuilder()
      .from(Member, 'member')
      .where('member.id = :id', { id })
      .select([
        'member.nickname as nickname',
        'member.profileImageUrl as profileImageUrl',
        'member.position as position',
        'member.career as career',
        'member.introduce as introduce',
        'member.stack as stack',
        'member.link as link',
      ])
      .getRawOne();

    return plainToInstance(GetMyPageInfoTuple, mypageInfo);
  }
}

export class GetMyPageInfoTuple {
  nickname?: string;
  profileImageUrl?: string;
  position?: string;
  career?: number;
  introduce?: string;
  stack?: string;
  link?: string;
}

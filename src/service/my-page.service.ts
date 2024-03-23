import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationRequest } from 'src/common/pagination/pagination-request';
import { PatchMyPageInfoDto } from 'src/dto/request/my-page/patch-my-page-info.dto';
import { GetMyPageInfoResponse } from 'src/dto/response/my-page/get-my-page-info.response';
import { GetMyPageScrapResponse } from 'src/dto/response/my-page/get-my-page-scrap.response';
import { Member } from 'src/entity/member.entity';
import { MyPageQueryRepository } from 'src/repository/my-page.query-repository';
import { Repository } from 'typeorm';

@Injectable()
export class MyPageService {
  constructor(
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
    private readonly mypageQueryRepository: MyPageQueryRepository,
  ) {}

  async getMyPageInfo(id: number): Promise<GetMyPageInfoResponse> {
    const myPageInfo = await this.mypageQueryRepository.getMyPageInfo(id);

    return new GetMyPageInfoResponse(
      myPageInfo.nickname,
      myPageInfo.profileImageUrl,
      myPageInfo.position,
      myPageInfo.career,
      myPageInfo.introduce,
      JSON.parse(myPageInfo.stack ?? JSON.stringify([])),
      myPageInfo.link,
    );
  }

  async patchMyPageInfo(id: number, memberInfo: PatchMyPageInfoDto): Promise<void> {
    const originMemberInfo = await this.memberRepository.findOneBy({ id });

    if (originMemberInfo === null) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    originMemberInfo.setMyPageInfo(
      memberInfo.nickname,
      memberInfo.profileImageUrl,
      memberInfo.position,
      memberInfo.career,
      memberInfo.introduce,
      JSON.stringify(memberInfo.stack ?? []),
      memberInfo.link,
    );

    await this.memberRepository.save(originMemberInfo);
  }

  async getMyPageScrapList(id: number, paginationRequest: PaginationRequest) {
    const myPageScrapListTuple = await this.mypageQueryRepository.getMyPageScrap(id, paginationRequest);
    const totalCount = await this.mypageQueryRepository.getMyPageScrapCount(id);

    const myPageScrapList = myPageScrapListTuple.map((scrap) => GetMyPageScrapResponse.from(scrap));

    return { myPageScrapList, totalCount };
  }
}

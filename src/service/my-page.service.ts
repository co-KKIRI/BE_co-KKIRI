import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationRequest } from 'src/common/pagination/pagination-request';
import { PatchMyPageInfoDto } from 'src/dto/request/my-page/patch-my-page-info.dto';
import { GetMyPageInfoResponse } from 'src/dto/response/my-page/get-my-page-info.response';
import { GetMyPageInviteResponse } from 'src/dto/response/my-page/get-my-page-invite.response';
import { GetMyPageScrapResponse } from 'src/dto/response/my-page/get-my-page-scrap.response';
import { GetMyPageVisibleProfileResponse } from 'src/dto/response/my-page/get-my-page-visible-profile.response';
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

  async deleteMyPageInfo(id: number): Promise<void> {
    const member = await this.memberRepository.findOneBy({ id });

    if (member === null) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    member.setDeletedAt(new Date());

    await this.memberRepository.save(member);
  }

  async getMyPageScrapList(
    id: number,
    paginationRequest: PaginationRequest,
  ): Promise<{ myPageScrapList: GetMyPageScrapResponse[]; totalCount: number }> {
    const myPageScrapListTuple = await this.mypageQueryRepository.getMyPageScrap(id, paginationRequest);
    const totalCount = await this.mypageQueryRepository.getMyPageScrapCount(id);

    const myPageScrapList = myPageScrapListTuple.map((scrap) => GetMyPageScrapResponse.from(scrap));

    return { myPageScrapList, totalCount };
  }

  async getMyPageInviteList(
    id: number,
    paginationRequest: PaginationRequest,
  ): Promise<{ inviteList: GetMyPageInviteResponse[]; totalCount: number }> {
    const inviteListTuple = await this.mypageQueryRepository.getMyPageInviteList(id, paginationRequest);
    const totalCount = await this.mypageQueryRepository.getMyPageInviteCount(id);

    const inviteList = inviteListTuple.map((invite) => GetMyPageInviteResponse.from(invite));

    return { inviteList, totalCount };
  }

  async getMyPageVisibleProfile(id: number): Promise<GetMyPageVisibleProfileResponse> {
    const visibleProfleDto = await this.mypageQueryRepository.getMyPageVisibleProfile(id);

    return new GetMyPageVisibleProfileResponse(visibleProfleDto.isVisibleProflie);
  }

  async patchVisibleProfile(id: number, isVisibleProfile: boolean): Promise<void> {
    const member = await this.memberRepository.findOneBy({ id });

    if (member === null) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    member.setIsVisibleProfile(isVisibleProfile);

    await this.memberRepository.save(member);
  }
}

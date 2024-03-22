import { Injectable } from '@nestjs/common';
import { GetMyPageInfoResponse } from 'src/dto/response/my-page/get-my-page-info.response';
import { MyPageQueryRepository } from 'src/repository/my-page.query-repository';

@Injectable()
export class MyPageService {
  constructor(private readonly mypageQueryRepository: MyPageQueryRepository) {}
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
}

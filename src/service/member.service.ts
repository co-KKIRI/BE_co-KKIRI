import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entity/member.entity';
import { SocialLoginDto } from 'src/dto/socialLoginDto';
import { GetMemberInfoSummaryResponse } from 'src/dto/response/member/get-member-info-summary.response';
import { MemberQueryRepository } from 'src/repository/member.query-repository';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly memberQueryRepository: MemberQueryRepository,
  ) {}

  async getMemberInfoSummary(id: number): Promise<GetMemberInfoSummaryResponse> {
    const memberSummary = await this.memberQueryRepository.getMemberInfoSummary(id);

    if (memberSummary === null) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const { nickname, profileImageUrl } = memberSummary;

    return new GetMemberInfoSummaryResponse(nickname, profileImageUrl);
  }

  async getMember(memberId: number) {
    const member = await this.memberRepository.findOneBy({ id: memberId });
    if (!member) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    return MemberDto.from(member);
  }
}

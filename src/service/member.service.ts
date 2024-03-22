import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entity/member.entity';
import { SocialLoginDto } from 'src/dto/socialLoginDto';
import { GetMemberInfoSummaryResponse } from 'src/dto/response/get-member-info-summary.response';
import { MemberQueryRepository } from 'src/repository/member.query-repository';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly memberQueryRepository: MemberQueryRepository,
  ) {
    // private readonly configService: ConfigService,
  }

  async createSocialUser(socialLoginInfoDto: SocialLoginDto): Promise<Member> {
    // const { email, firstName, lastName, socialProvider, externalId, refreshToken } = socialLoginInfoDto;

    const newMember: Member = await this.memberRepository.save({
      // email: email,
      // firstName: firstName,
      // lastName: lastName,
      // socialProvider: socialProvider,
      // externalId: externalId,
      // socialProvidedRefreshToken: refreshToken,
    });
    return await this.memberRepository.save(newMember);
  }

  async getMemberInfoSummary(id: number): Promise<GetMemberInfoSummaryResponse> {
    const memberSummary = await this.memberQueryRepository.getMemberInfoSummary(id);

    if (memberSummary === null) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const { nickname, profileImageUrl } = memberSummary;

    return new GetMemberInfoSummaryResponse(nickname ?? '', profileImageUrl ?? '');
  }

  // async findUserById(id: number): Promise<User> {
  //   return await this.userRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // async updateSocialUserInfo(id: number) {
  //   await this.userRepository.update(id, {
  //     isSocialAccountRegistered: true,
  //   });
  //   const updateUser = await this.userRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return updateUser;
  // }

  // async updateSocialUserRefToken(id: number, refreshToken: string) {
  //   await this.userRepository.update(id, {
  //     socialProvidedRefreshToken: refreshToken,
  //   });
  //   const updateUser = await this.userRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return updateUser;
  // }
}

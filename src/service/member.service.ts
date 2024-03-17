import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entity/member.entity';
import { SocialLoginDto } from 'src/dto/socialLoginDto';

@Injectable()
export class MemberService {
  constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) {
    // private readonly userRepository: UsersRepository,
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

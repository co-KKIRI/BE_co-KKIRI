import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialLoginDto } from 'src/dto/socialLoginDto';
import { Member } from 'src/entity/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthenticationService {
  constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {}
  async validateAndSaveUser(socialLoginDto: SocialLoginDto) {
    const { nickname, profileImageUrl, socialProvider, externalId } = socialLoginDto;

    const member = await this.memberRepository.findOneBy({ externalId: externalId });

    if (member) {
      member.setProfileInfo(nickname, profileImageUrl);

      const updatedMember = await this.memberRepository.save(member);
      return updatedMember;
    } else {
      const newMember = new Member();

      newMember.nickname = nickname;
      newMember.profileImageUrl = profileImageUrl;
      newMember.socialProvider = socialProvider;
      newMember.externalId = externalId;

      const savedMember = await this.memberRepository.save(newMember);
      return savedMember;
    }
  }
}

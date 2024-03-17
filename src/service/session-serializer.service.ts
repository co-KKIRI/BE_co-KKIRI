import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GoogleAuthenticationService } from 'src/service/google-authentication.service';
import { Member } from 'src/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionSerializerService extends PassportSerializer {
  constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) {
    super();
  }

  async serializeUser(member: Member, done: (err: any, user?: any) => void): Promise<any> {
    console.log(member, 'serializeUser'); // 테스트 시 확인
    done(null, member);
  }

  async deserializeUser(payload: any, done: (err: any, user?: any) => void): Promise<any> {
    const member = await this.memberRepository.findOne({
      where: {
        id: payload.id,
      },
    });
    console.log(member, 'deserializeUser'); // 테스트 시 확인
    return member ? done(null, member) : done(null, null);
  }
}

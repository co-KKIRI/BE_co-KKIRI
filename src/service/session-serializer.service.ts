import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Member } from 'src/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionSerializerService extends PassportSerializer {
  constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {
    super();
  }

  async serializeUser(member: Member, done: (err: any, user?: any) => void): Promise<any> {
    done(null, member);
  }

  async deserializeUser(payload: Member, done: (err: any, user?: any) => void): Promise<any> {
    const member = await this.memberRepository.findOneBy({ externalId: payload.externalId! });
    return done(null, member);
  }
}

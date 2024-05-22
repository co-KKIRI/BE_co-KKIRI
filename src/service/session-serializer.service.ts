import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Member } from 'src/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberQueryRepository } from '../repository/member.query-repository';

@Injectable()
export class SessionSerializerService extends PassportSerializer {
  constructor(private readonly memberQueryRepository: MemberQueryRepository) {
    super();
  }

  async serializeUser(member: Member, done: (err: any, user?: any) => void): Promise<any> {
    done(null, member);
  }

  async deserializeUser(payload: MemberPayload, done: (err: any, user?: any) => void): Promise<any> {
    const member = await this.memberQueryRepository.getMember(payload.externalId!);
    if (member) member['accessToken'] = payload.accessToken; // 회원 탈퇴 시 OAuth revoke를 위한 accessToken 저장
    return done(null, member);
  }
}

interface MemberPayload extends Member {
  accessToken: string;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTeamInviteInfoResponse } from 'src/dto/response/team/get-team-invite-info.response';
import { TeamMember } from 'src/entity/team-member.entity';
import { TeamInviteQueryRepository } from 'src/repository/team-invite.query-repository';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamInviteQueryRepository: TeamInviteQueryRepository,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  async getTeamInviteInfo(id: number, teamInviteId: number): Promise<GetTeamInviteInfoResponse> {
    const tuple = await this.teamInviteQueryRepository.getTeamInviteInfo(id, teamInviteId);
    if (!tuple) {
      throw new NotFoundException('팀 초대 정보를 찾을 수 없습니다.');
    }

    const { sendMemberId, sendMemberNickname, sendMemberProfileImageUrl, postId, postTitle, message, teamMemberId } =
      tuple;

    return new GetTeamInviteInfoResponse(
      sendMemberId,
      sendMemberNickname,
      postId,
      postTitle,
      message,
      teamMemberId,
      sendMemberProfileImageUrl,
    );
  }
}

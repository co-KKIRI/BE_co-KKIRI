import { Injectable } from '@nestjs/common';
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
    const { sendMemberId, sendMemberNickname, sendMemberProfileImageUrl, postId, postTitle, message, teamMemberId } =
      await this.teamInviteQueryRepository.getTeamInviteInfo(id, teamInviteId);

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

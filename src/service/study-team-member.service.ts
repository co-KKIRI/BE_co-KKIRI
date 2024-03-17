import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { TeamMemberStatus } from '../entity/common/Enums';

@Injectable()
export class StudyTeamMemberService {
  constructor(@InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>) {}

  async acceptTeamMember(teamMemberId: number): Promise<void> {
    const teamMember = await this.getTeamMember(teamMemberId);

    this.checkModifiableTeamMember(teamMember);

    teamMember.setStatus(TeamMemberStatus.ACCEPT);
    await this.teamMemberRepository.save(teamMember);
  }

  async rejectTeamMember(teamMemberId: number): Promise<void> {
    const teamMember = await this.getTeamMember(teamMemberId);

    this.checkModifiableTeamMember(teamMember);

    teamMember.setStatus(TeamMemberStatus.REJECT);
    await this.teamMemberRepository.save(teamMember);
  }

  private async getTeamMember(teamMemberId: number): Promise<TeamMember> {
    const teamMember = await this.teamMemberRepository.findOneBy({ id: teamMemberId });
    if (teamMember === null) {
      throw new NotFoundException('해당 신청을 찾을 수 없습니다.');
    }
    return teamMember;
  }

  private checkModifiableTeamMember(teamMember: TeamMember): void {
    if (teamMember.status === TeamMemberStatus.ACCEPT) {
      throw new BadRequestException('이미 수락된 신청입니다.');
    }
    if (teamMember.status === TeamMemberStatus.REJECT) {
      throw new BadRequestException('이미 거절된 신청입니다.');
    }
  }
}

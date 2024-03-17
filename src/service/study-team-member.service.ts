import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { TeamMemberStatus } from '../entity/common/Enums';
import { TeamMemberQueryRepository } from '../repository/team-member.query-repository';
import { GetStudyTeamMemberDto } from '../dto/get-study-team-member.dto';
import { Post } from '../entity/post.entity';

@Injectable()
export class StudyTeamMemberService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
    private readonly teamMemberQueryRepository: TeamMemberQueryRepository,
  ) {}

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

  async getAllStudyTeamMember(postId: number): Promise<GetStudyTeamMemberDto> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    const teamMembersTuples = await this.teamMemberQueryRepository.getAllTeamMembers(postId, TeamMemberStatus.ACCEPT);
    return GetStudyTeamMemberDto.from(teamMembersTuples, post.memberId);
  }

  async deleteTeamMember(teamMemberId: number): Promise<void> {
    const teamMember = await this.teamMemberRepository.findOneBy({ id: teamMemberId, status: TeamMemberStatus.ACCEPT });
    if (teamMember === null) {
      throw new NotFoundException('해당 팀원을 찾을 수 없습니다.');
    }

    teamMember.setStatus(TeamMemberStatus.READY);
    await this.teamMemberRepository.save(teamMember);
  }
}

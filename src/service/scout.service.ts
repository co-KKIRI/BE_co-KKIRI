import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PaginationRequest } from '../common/pagination/pagination-request';
import { ScoutQueryRepository } from '../repository/scout.query-repository';
import { GetScoutPostDto } from '../dto/get-scout-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamInvite } from '../entity/team-invite.entity';
import { Repository } from 'typeorm';
import { TeamMember } from '../entity/team-member.entity';
import { Post } from '../entity/post.entity';

@Injectable()
export class ScoutService {
  constructor(
    private readonly scoutQueryRepository: ScoutQueryRepository,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(TeamInvite) private readonly teamInviteRepository: Repository<TeamInvite>,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  async getScoutPostList(paginationRequest: PaginationRequest, memberId: number) {
    const scoutPostTuples = await this.scoutQueryRepository.getScoutPostList(paginationRequest, memberId);
    const totalCount = await this.scoutQueryRepository.getScoutPostListTotalCount(memberId);

    const getScoutPostDtoList = scoutPostTuples.map(GetScoutPostDto.from);
    return { getScoutPostDtoList, totalCount };
  }

  async invite(postId: number, sendMemberId: number, receiveMemberId: number, message: string) {
    const myPost = await this.postRepository.existsBy({ id: postId, memberId: sendMemberId });
    if (!myPost) {
      throw new ForbiddenException('초대할 권한이 없습니다.');
    }

    const isExistTeamInvite = await this.scoutQueryRepository.isExistTeamInviteMember(
      postId,
      sendMemberId,
      receiveMemberId,
    );
    if (isExistTeamInvite) {
      throw new BadRequestException('이미 초대한 유저입니다.');
    }

    const foundTeamMember = await this.teamMemberRepository.findOneBy({ postId, memberId: receiveMemberId });
    if (foundTeamMember) {
      if (foundTeamMember.isApplied()) {
        throw new BadRequestException('현재 신청중인 유저입니다.');
      }
      throw new BadRequestException('이미 팀 멤버입니다.');
    }

    const teamInvite = await this.teamInviteRepository.save(
      TeamInvite.invite(sendMemberId, receiveMemberId, postId, message),
    );
    const teamMember = TeamMember.invite(postId, receiveMemberId, teamInvite.id);
    await this.teamMemberRepository.save(teamMember);
  }
}

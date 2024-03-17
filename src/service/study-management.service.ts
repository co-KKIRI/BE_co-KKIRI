import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entity/post.entity';
import { Repository } from 'typeorm';
import { GetStudyManagementDto } from '../dto/get-study-management.dto';

@Injectable()
export class StudyManagementService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  async getStudyManagement(postId: number): Promise<GetStudyManagementDto> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    // TODO: 유저 인증 정보와 비교하여 리더 여부 확인해야함
    const currentMemberId = post.memberId;
    const isLeader = post.memberId == currentMemberId;

    return new GetStudyManagementDto({ post, isLeader: isLeader });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostScrap } from 'src/entity/post-scrap.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostScrap) private readonly postScrapRepository: Repository<PostScrap>) {}

  async postScrap(memberId: number, postId: number): Promise<void> {
    const postScrap = await this.postScrapRepository.findOneBy({ memberId, postId });

    if (postScrap) {
      throw new BadRequestException('이미 스크랩한 게시글입니다.');
    }

    const newPostScrap = new PostScrap();
    newPostScrap.memberId = memberId;
    newPostScrap.postId = postId;

    await this.postScrapRepository.save(newPostScrap);
  }

  async deleteScrap(memberId: number, postId: number): Promise<void> {
    const postScrap = await this.postScrapRepository.findOneBy({ memberId, postId });

    if (!postScrap) {
      throw new BadRequestException('스크랩한 게시글이 아닙니다.');
    }

    await this.postScrapRepository.remove(postScrap);
  }
}

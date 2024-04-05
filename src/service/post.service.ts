import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostScrap } from 'src/entity/post-scrap.entity';
import { Post } from 'src/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostScrap) private readonly postScrapRepository: Repository<PostScrap>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>) { }

  async postScrap(memberId: number, postId: number): Promise<void> {
    const postScrap = await this.postScrapRepository.findOneBy({ memberId, postId });

    if (postScrap) {
      throw new BadRequestException('이미 스크랩한 게시글입니다.');
    }

    const newPostScrap = new PostScrap();
    newPostScrap.memberId = memberId;
    newPostScrap.postId = postId;

    await this.postScrapRepository.save(newPostScrap);
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post !== null) {
      post?.increaseScrapNum();
      await this.postRepository.save(post);
    }
  }

  async deleteScrap(memberId: number, postId: number): Promise<void> {
    const postScrap = await this.postScrapRepository.findOneBy({ memberId, postId });

    if (!postScrap) {
      throw new BadRequestException('스크랩한 게시글이 아닙니다.');
    }

    await this.postScrapRepository.remove(postScrap);
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post !== null) {
      post?.decreaseScrapNum();
      await this.postRepository.save(post);
    }
  }
}

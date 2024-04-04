import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetReviewCommentList } from 'src/dto/get-review-comment.request';
import { GetReviewList } from 'src/dto/get-review.dto';
import { PostReviewRequest } from 'src/dto/request/review/post-review.requset';
import { GetReviewMemberResponse } from 'src/dto/response/review/get-review-member.response';
import { TeamMemberStatus } from 'src/entity/common/Enums';
import { MemberReviewComment } from 'src/entity/member-review-comment-entity';
import { MemberReview } from 'src/entity/member-review.entity';
import { PostReview } from 'src/entity/post-review.entity';
import { Post } from 'src/entity/post.entity';
import { TeamMember } from 'src/entity/team-member.entity';
import { reviewQueryRepository } from 'src/repository/review.query-repository';
import { TeamMemberQueryRepository } from 'src/repository/team-member.query-repository';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(PostReview) private readonly postReviewRepository: Repository<PostReview>,
    @InjectRepository(MemberReview) private readonly memberReviewRepository: Repository<MemberReview>,
    @InjectRepository(MemberReviewComment)
    private readonly memberReviewCommentRepository: Repository<MemberReviewComment>,
    @InjectRepository(TeamMember) private readonly teamMemberRepository: Repository<TeamMember>,
    private readonly teamMemberQueryRepository: TeamMemberQueryRepository,
    private readonly reviewQueryRepository: reviewQueryRepository,
  ) { }

  async postReview(reviewerId: number, reviewContent: PostReviewRequest) {
    const duplicatedReview = await this.postReviewRepository.findOneBy({ postId: reviewContent.postId, memberId: reviewerId });
    if (duplicatedReview !== null) {
      throw new ConflictException('이미 리뷰를 작성한 사용자입니다.');
    }
    const postReviewList = reviewContent.postReview.map((r) => {
      const postReview = new PostReview();

      postReview.memberId = reviewerId;
      postReview.postId = reviewContent.postId;
      postReview.type = r.type;
      postReview.content = r.content;

      return postReview;
    });

    await this.postReviewRepository.save(postReviewList);

    const memberReviewList = reviewContent.memberReview.map((r) => {
      const memberReview = new MemberReview();

      memberReview.postId = reviewContent.postId;
      memberReview.reviewerMemberId = reviewerId;
      memberReview.revieweeMemberId = r.revieweeMemberId;
      memberReview.type = r.type;
      memberReview.content = r.content;

      return memberReview;
    });

    await this.memberReviewRepository.save(memberReviewList);

    const memberReviewCommentList = reviewContent.memberReviewComment.map((r) => {
      const memberReviewComment = new MemberReviewComment();

      memberReviewComment.postId = reviewContent.postId;
      memberReviewComment.reviewerMemberId = reviewerId;
      memberReviewComment.revieweeMemberId = r.revieweeMemberId;
      memberReviewComment.comment = r.comment;

      return memberReviewComment;
    });

    await this.memberReviewCommentRepository.save(memberReviewCommentList);
  }

  async getReviewMember(postId: number, memberId: number) {
    const isTeamMember = await this.teamMemberRepository.findOneBy({
      postId,
      memberId,
      status: TeamMemberStatus.ACCEPT
    })
    const post = await this.postRepository.findOneBy({ id: postId, memberId })
    if (!isTeamMember && !post) {
      throw new NotFoundException('해당 팀에 속해있지 않습니다.')
    }
    const teamMember = await this.teamMemberQueryRepository.getReviewMember(postId, memberId);
    const teamLeader = await this.teamMemberQueryRepository.getReviewLeader(postId);
    if (teamLeader && teamLeader.memberId !== memberId) {
      teamMember.push(teamLeader);
    }
    return teamMember.map((member) => GetReviewMemberResponse.from(member));
  }

  async getReview(postId: number, memberId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post === null) {
      throw new NotFoundException('해당 포스트를 찾을 수 없습니다.');
    }
    const postTitle = post.title;
    const postReviewsTuple = await this.reviewQueryRepository.getPostReview(postId);
    const memberReviewsTuple = await this.reviewQueryRepository.getMemberReview(postId, memberId);
    const memberReviewCommentsTuple = await this.reviewQueryRepository.getMemberReviewComment(postId, memberId);

    const postReviews = postReviewsTuple.map((review) => GetReviewList.reviewFrom(review));
    const memberReviews = memberReviewsTuple.map((review) => GetReviewList.reviewFrom(review));
    const memberReviewComments = memberReviewCommentsTuple.map((review) => GetReviewCommentList.reviewCommentFrom(review));
    return { postTitle, postReviews, memberReviews, memberReviewComments };
  }
}

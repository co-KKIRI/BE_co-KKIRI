import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { GetPostListDto, GetPostedList } from "src/dto/get-post-list.dto";
import { SearchPostList } from "src/dto/request/search-post-list.request";
import { Post } from "src/entity/post.entity";
import { PostListQueryRepository } from "src/repository/post-list.query-repository";
import { Repository } from "typeorm";

@Injectable()
export class PostListService {
  constructor(private readonly postListQueryRepository: PostListQueryRepository,
  ) { }

  async getMainPostList(memberId: number) {
    const mainStudyLatestTuples = await this.postListQueryRepository.getMainStudyLatestList(memberId);
    const mainStudyHottestTuples = await this.postListQueryRepository.getMainStudyHottestList(memberId);
    const mainProjectLatestTuples = await this.postListQueryRepository.getMainProjectLatestList(memberId);
    const mainProjectHottestTuples = await this.postListQueryRepository.getMainProjectHottestList(memberId);

    const newStudyList = mainStudyLatestTuples.map((postInfo) =>
      GetPostedList.from(postInfo));
    const hotStudyList = mainStudyHottestTuples.map((postInfo) =>
      GetPostedList.from(postInfo));
    const newProjectList = mainProjectLatestTuples.map((postInfo) =>
      GetPostedList.from(postInfo));
    const hotProjectList = mainProjectHottestTuples.map((postInfo) =>
      GetPostedList.from(postInfo));

    return { newStudyList, hotStudyList, newProjectList, hotProjectList };
  }


  async getPostList(searchPostList: SearchPostList, memberId: number) {
    const meetingType = searchPostList.meetingType;
    const position = searchPostList.position;
    const progressWay = searchPostList.progressWay;
    const stacks = searchPostList.stacks ?? [];
    const sortBy = searchPostList.sortBy;

    const postListTuples = await this.postListQueryRepository.getAllPostList(searchPostList, stacks, memberId, meetingType, position, progressWay, sortBy);
    const totalCount = await this.postListQueryRepository.getAllPostListTotalCount(searchPostList, stacks, meetingType, position, progressWay, sortBy);
    const postInfo = postListTuples.map((postList) =>
      GetPostedList.from(postList));

    return { postInfo, totalCount };
  }

  async getMyRecruitedPost(paginationRequest: PaginationRequest, memberId: number) {
    const myRecruitedPostTuples = await this.postListQueryRepository.getAllMyRecruitedPost(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllMyRecruitedPostCount(memberId);

    const getMyRecruitedPost = myRecruitedPostTuples.map((postList) =>
      GetPostedList.from(postList));
    return { getMyRecruitedPost, totalCount };
  }
}
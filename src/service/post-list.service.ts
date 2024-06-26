import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationRequest } from "src/common/pagination/pagination-request";
import { GetCompletePostedList } from "src/dto/get-post-complete.dto";
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
    const search = searchPostList.search;

    const postListTuples = await this.postListQueryRepository.getAllPostList(searchPostList, stacks, memberId, meetingType, position, progressWay, sortBy, search);
    const totalCount = await this.postListQueryRepository.getAllPostListTotalCount(searchPostList, stacks, meetingType, position, progressWay, sortBy, search);
    const postInfo = postListTuples.map((postList) =>
      GetPostedList.from(postList));

    return { postInfo, totalCount };
  }

  async getMyAppliedPost(paginationRequest: PaginationRequest, memberId: number) {
    const myAppliedPostTuples = await this.postListQueryRepository.getAllMyAppliedPost(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllMyAppliedPostCount(memberId);

    const getMyAppliedPost = myAppliedPostTuples.map((postList) =>
      GetPostedList.from(postList));
    return { getMyAppliedPost, totalCount };
  }

  async getMyRecruitedPost(paginationRequest: PaginationRequest, memberId: number) {
    const myRecruitedPostTuples = await this.postListQueryRepository.getAllMyRecruitedPost(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllMyRecruitedPostCount(memberId);

    const getMyRecruitedPost = myRecruitedPostTuples.map((postList) =>
      GetPostedList.from(postList));
    return { getMyRecruitedPost, totalCount };
  }

  async getMyOnGoingPost(paginationRequest: PaginationRequest, memberId: number) {
    const myOnGoingPostTuples = await this.postListQueryRepository.getAllMyOnGoingPost(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllMyOnGoingPostCount(memberId);

    const getMyOnGoingPost = myOnGoingPostTuples.map((postList) =>
      GetPostedList.from(postList));
    return { getMyOnGoingPost, totalCount };
  }

  async getMyCompletedPost(paginationRequest: PaginationRequest, memberId: number) {
    const myCompletedPostTuples = await this.postListQueryRepository.getAllMyCompletedPost(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllMyCompletedPostCount(memberId);

    const getMyCompletedPost = myCompletedPostTuples.map((postList) =>
      GetCompletePostedList.from(postList));
    return { getMyCompletedPost, totalCount };
  }

  async getMyWaitingPost(paginationRequest: PaginationRequest, memberId: number) {
    const myWaitingPostTuples = await this.postListQueryRepository.getAllMyWaitingPost(paginationRequest, memberId);
    const totalCount = await this.postListQueryRepository.getAllMyWaitingPostCount(memberId);

    const getMyWaitingPost = myWaitingPostTuples.map((postList) =>
      GetPostedList.from(postList));
    return { getMyWaitingPost, totalCount };
  }
}
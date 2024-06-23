import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { VideosService } from 'src/videos/videos.service';
import { MemberGuard } from 'src/common/guards/member.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { User } from 'src/generated/user/user.model';
import { UtilsService } from 'src/utils/utils.service';
import { Video } from 'src/generated/video/video.model';
import { UpdateOneVideoArgs } from 'src/generated/video/update-one-video.args';
import { DeleteOneVideoArgs } from 'src/generated/video/delete-one-video.args';
import { FindUniqueVideoArgs } from 'src/generated/video/find-unique-video.args';
import { VideoModel } from 'src/videos/models/video.model';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { PaginatedUser } from 'src/users/models/paginatedUser.model';
import { UsersResolver } from 'src/users/users.resolver';
import { PaginatedVideo } from 'src/videos/models/paginatedVideo.model';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';

@Resolver(() => VideoModel)
export class VideosResolver {
  constructor(
    private videosService: VideosService,
    private utilsService: UtilsService,
    private usersResolver: UsersResolver,
  ) {}

  @UseGuards(MemberGuard)
  @Mutation(() => VideoModel)
  async uploadVideo(
    @CurrentUser() currentUser: User,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(`start upload : ${JSON.stringify(file)}`);

    if (!this.videosService.isVideoFile(file)) {
      throw new BadRequestException('Invalid file type');
    }

    const { name } = this.utilsService.splitFilename(file.filename);

    const video: Video = await this.videosService.createVideo({
      data: {
        title: name,
        Owner: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    const result = this.videosService.storeVideo(file, video);

    if (!result) {
      throw new Error('Internal Server Error');
    }

    return video;
  }

  @UseGuards(MemberGuard)
  @Mutation(() => VideoModel)
  async updateVideo(
    @CurrentUser() currentUser: User,
    @Args() { where, data }: UpdateOneVideoArgs,
  ) {
    const video = await this.videosService.updateVideo({
      where,
      data,
      include: {
        Owner: {
          include: {
            ownVideos: true,
            invitedVideos: true,
            _count: true,
          },
        },
      },
    });
  }

  @UseGuards(MemberGuard)
  @Mutation(() => Boolean)
  async deleteVideo(
    @CurrentUser() currentUser: User,
    @Args() data: DeleteOneVideoArgs,
  ) {
    return await this.videosService.deleteVideo(data);
  }

  @Query(() => VideoModel, { description: 'Get a video by ID' })
  async video(@Args() data: FindUniqueVideoArgs) {
    return await this.videosService.video(data);
  }

  @Query(() => PaginatedVideo, { description: 'Get all videos' })
  async videos(@Args() query: FindManyVideoArgs) {
    const videos = await this.videosService.videos(query);

    const totalCount = await this.videosService.totalCount(query);

    const edges = this.utilsService.generateEdges(videos);

    const pageInfo = this.utilsService.generatePageInfo({
      skip: query.skip,
      take: query.take,
      totalCount,
      edges,
    });

    return { edges, pageInfo, totalCount, nodes: videos };
  }

  @ResolveField(() => User, { name: 'Owner' }) async owner(
    @Parent() video: Video,
  ): Promise<User> {
    return await this.usersResolver.user({ where: { id: video.ownerId } });
  }

  @ResolveField(() => PaginatedUser, { name: 'Guests' })
  async getGuests(
    @Parent() video: Video,
    @Args() { skip, take, cursor, where, orderBy }: FindManyUserArgs,
  ) {
    return await this.usersResolver.users({
      skip,
      take,
      cursor,
      where: {
        ...where,
        invitedVideos: { some: { id: { equals: video.id } } },
      },
      orderBy,
    });
  }
}

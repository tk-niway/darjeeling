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
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import {
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { Video } from 'src/generated/video/video.model';
import { UpdateOneVideoArgs } from 'src/generated/video/update-one-video.args';
import { DeleteOneVideoArgs } from 'src/generated/video/delete-one-video.args';
import { FindUniqueVideoArgs } from 'src/generated/video/find-unique-video.args';
import { VideoModel } from 'src/videos/models/video.model';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { PaginatedVideo } from 'src/videos/models/paginatedVideo.model';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/models/user.model';

@Resolver(() => VideoModel)
export class VideosResolver {
  constructor(
    private videosService: VideosService,
    private utilsService: UtilsService,
    private usersService: UsersService,
  ) {}

  // ------------------------------
  // ----- Resolver Fields -----
  // ------------------------------

  @ResolveField(() => UserModel, { name: 'Owner' }) async owner(
    @Parent() video: Video,
  ): Promise<UserModel> {
    return await this.usersService.user({ where: { id: video.ownerId } });
  }

  @ResolveField(() => [UserModel], { name: 'Guests' })
  async getGuests(@Parent() video: Video, @Args() query: FindManyUserArgs) {
    const { skip, take, cursor, where, orderBy, distinct } =
      this.utilsService.findManyArgsValidation(query);

    return await this.usersService.users({
      skip,
      take,
      cursor,
      where: {
        ...where,
        invitedVideos: { some: { id: { equals: video.id } } },
      },
      orderBy,
      distinct,
    });
  }

  // ------------------------------
  // ----- Queries -----
  // ------------------------------

  @Query(() => VideoModel, { description: 'Get a video by ID' })
  async video(@Args() data: FindUniqueVideoArgs) {
    return await this.videosService.video(data);
  }

  @Query(() => PaginatedVideo, { description: 'Get all videos' })
  async videos(@Args() query: FindManyVideoArgs) {
    query = this.utilsService.findManyArgsValidation(query);

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

  // ------------------------------
  // ----- Mutations -----
  // ------------------------------

  @UseGuards(MemberGuard)
  @Mutation(() => VideoModel)
  async uploadVideo(
    @CurrentUser() currentUser: UserModel,
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
      throw new InternalServerErrorException('Error storing video');
    }

    return video;
  }

  @UseGuards(MemberGuard)
  @Mutation(() => VideoModel)
  async updateVideo(
    @CurrentUser() currentUser: UserModel,
    @Args() query: UpdateOneVideoArgs,
  ) {
    return await this.videosService.updateVideo(query);
  }

  @UseGuards(MemberGuard)
  @Mutation(() => Boolean)
  async deleteVideo(
    @CurrentUser() currentUser: UserModel,
    @Args() query: DeleteOneVideoArgs,
  ) {
    return await this.videosService.deleteVideo(query);
  }
}

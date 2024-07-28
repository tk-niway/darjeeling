import { GuestsDataLoader } from './dataloaders/guests.dataloader';
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
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { UpdateOneVideoArgs } from 'src/generated/video/update-one-video.args';
import { DeleteOneVideoArgs } from 'src/generated/video/delete-one-video.args';
import { FindUniqueVideoArgs } from 'src/generated/video/find-unique-video.args';
import { VideoModel } from 'src/videos/models/video.model';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { PaginatedVideo } from 'src/videos/models/paginatedVideo.model';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { UserModel } from 'src/users/models/user.model';
import { OwnerDataLoader } from 'src/videos/dataloaders/owner.dataloader';

@Resolver(() => VideoModel)
export class VideosResolver {
  constructor(
    private readonly videosService: VideosService,
    private readonly utilsService: UtilsService,
    private readonly guestsDataLoader: GuestsDataLoader,
    private readonly ownerDataLoader: OwnerDataLoader,
  ) {}

  // ------------------------------
  // ----- Resolver Fields -----
  // ------------------------------

  @ResolveField(() => UserModel, {
    name: 'Owner',
    description: 'Owner of the video',
  })
  async owner(@Parent() video: VideoModel) {
    return await this.ownerDataLoader.load(video);
  }

  @ResolveField(() => [UserModel], {
    name: 'Guests',
    description: 'Guests of the video',
  })
  async guests(@Parent() video: VideoModel, @Args() query: FindManyUserArgs) {
    query = this.utilsService.findManyArgsValidation(query);

    return await this.guestsDataLoader.load({ query, video });
  }

  // ------------------------------
  // ----- Queries -----
  // ------------------------------

  @Query(() => VideoModel, { description: 'Get a video by ID' })
  async video(@Args() data: FindUniqueVideoArgs) {
    const video = await this.videosService.video(data);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }

  @Query(() => PaginatedVideo, { description: 'Get all videos' })
  async videos(@Args() query: FindManyVideoArgs) {
    query = this.utilsService.findManyArgsValidation(query);

    const { videos, totalCount } = await this.videosService.videosWithCount(
      query,
    );

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
  @Mutation(() => VideoModel, { description: 'Upload a video' })
  async uploadVideo(
    @CurrentUser() currentUser: UserModel,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(`start upload : ${JSON.stringify(file)}`);

    if (!this.videosService.isVideoFile(file)) {
      throw new BadRequestException('Invalid file type');
    }

    const { name } = this.utilsService.splitFilename(file.filename);

    const video: VideoModel = await this.videosService.createVideo({
      data: {
        title: name,
        Owner: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    this.videosService.storeVideo(file, video);

    return video;
  }

  @UseGuards(MemberGuard)
  @Mutation(() => VideoModel, { description: 'Update a video' })
  async updateVideo(@Args() query: UpdateOneVideoArgs) {
    const video = await this.videosService.updateVideo(query);

    if (!video) {
      throw new BadRequestException('Video not updated');
    }

    return video;
  }

  @UseGuards(MemberGuard)
  @Mutation(() => VideoModel, { description: 'Delete a video' })
  async deleteVideo(@Args() query: DeleteOneVideoArgs) {
    const video = await this.videosService.deleteVideo(query);

    if (!video) {
      throw new BadRequestException('Video not deleted');
    }

    return video;
  }
}

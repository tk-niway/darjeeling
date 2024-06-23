import { Args, Mutation, Resolver } from '@nestjs/graphql';
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

// TODO create video and videos for fetching video information
// TODO create DTO
@Resolver()
export class VideosResolver {
  constructor(
    private videosService: VideosService,
    private utilsService: UtilsService,
  ) {}

  @UseGuards(MemberGuard)
  @Mutation(() => Video)
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
      include: {
        Owner: true,
        guests: true,
      },
    });

    const result = this.videosService.storeVideo(file, video);

    if (!result) {
      throw new Error('Internal Server Error');
    }

    return video;
  }

  @UseGuards(MemberGuard)
  @Mutation(() => Video)
  async updateVideo(
    @CurrentUser() currentUser: User,
    @Args() { where, data }: UpdateOneVideoArgs,
  ) {
    const video = await this.videosService.updateVideo({
      where,
      data,
      include: {
        Owner: true,
        guests: true,
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
}

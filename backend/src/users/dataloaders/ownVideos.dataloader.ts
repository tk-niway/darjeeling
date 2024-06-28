import { Injectable, Scope } from '@nestjs/common';
import { UserModel } from 'src/users/models/user.model';
import { VideosService } from 'src/videos/videos.service';
import { BaseDataLoader } from 'src/common/dataloaders/base.dataloader';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { VideoModel } from 'src/videos/models/video.model';

type VideosArgs = { query: FindManyVideoArgs; user: UserModel };

@Injectable({ scope: Scope.REQUEST })
export class OwnVideosDataLoader extends BaseDataLoader<
  VideosArgs,
  VideoModel[]
> {
  constructor(private readonly videosService: VideosService) {
    super();
  }

  protected async batchLoad(
    args: VideosArgs[],
  ): Promise<(VideoModel[] | Error)[]> {
    const ids = args.map(({ user }) => user.id);

    const query = args[0].query;

    const videos = await this.videosService.videos({
      ...query,
      where: { ownerId: { in: ids } },
    });

    const mappedVideos = args.map(({ user }) => {
      const videoForUser = videos.filter((video) => video.ownerId === user.id);

      return videoForUser.length > 0 ? videoForUser : [];
    });

    return mappedVideos;
  }
}

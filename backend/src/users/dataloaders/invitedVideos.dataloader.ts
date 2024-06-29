import { Injectable, Scope } from '@nestjs/common';
import { UserModel } from 'src/users/models/user.model';
import { VideosService } from 'src/videos/videos.service';
import { BaseDataLoader } from 'src/common/dataloaders/base.dataloader';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { VideoModel } from 'src/videos/models/video.model';
import { Video } from 'src/generated/video/video.model';

type VideosArgs = { query: FindManyVideoArgs; user: UserModel };

type VideoModelWithGuests = VideoModel & { guests?: Video['guests'] };

@Injectable({ scope: Scope.REQUEST })
export class InvitedVideosDataLoader extends BaseDataLoader<
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

    const videos: VideoModelWithGuests[] = await this.videosService.videos({
      ...query,
      where: { guests: { some: { id: { in: ids } } } },
      include: { guests: true },
    });

    return args.map(({ user }) => this.filterVideosByUser(videos, user.id));
  }

  private filterVideosByUser(videos: Video[], userId: string): Video[] {
    return videos.filter((video) =>
      video.guests.some((guest) => guest.id === userId),
    );
  }
}

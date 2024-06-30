import { Injectable, Scope } from '@nestjs/common';
import { BaseDataLoader } from 'src/common/dataloaders/base.dataloader';
import { VideoModel } from 'src/videos/models/video.model';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class OwnerDataLoader extends BaseDataLoader<VideoModel, UserModel> {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  protected async batchLoad(
    videos: VideoModel[],
  ): Promise<(UserModel | Error)[]> {
    const ids = videos.map((video) => video.id);

    let users: (UserModel & {
      ownVideos?: VideoModel[];
    })[];

    try {
      users = await this.usersService.users({
        where: { ownVideos: { some: { id: { in: ids } } } },
        include: { ownVideos: true },
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return videos.map(() => new Error('Error fetching users'));
    }

    return videos.map((video) => {
      const user = users.find((user) =>
        user.ownVideos?.some((ownVideo) => ownVideo.id === video.id),
      );
      return user || new Error('User not found');
    });
  }
}

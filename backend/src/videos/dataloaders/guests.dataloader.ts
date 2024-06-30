import { Injectable, Scope } from '@nestjs/common';
import { BaseDataLoader } from 'src/common/dataloaders/base.dataloader';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { User } from 'src/generated/user/user.model';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { VideoModel } from 'src/videos/models/video.model';

type GuestsArgs = { query: FindManyUserArgs; video: VideoModel };

type UserModelWithInvites = UserModel & {
  invitedVideos?: User['invitedVideos'];
};

@Injectable({ scope: Scope.REQUEST })
export class GuestsDataLoader extends BaseDataLoader<GuestsArgs, UserModel[]> {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  protected async batchLoad(
    args: GuestsArgs[],
  ): Promise<(UserModel[] | Error)[]> {
    const ids = args.map(({ video }) => video.id);

    const query = args[0].query;

    const users: UserModelWithInvites[] = await this.usersService.users({
      ...query,
      where: { invitedVideos: { some: { id: { in: ids } } } },
      include: { invitedVideos: true },
    });

    return args.map(({ video }) => this.filterUsersByVideos(users, video.id));
  }

  private filterUsersByVideos(users: User[], videoId: string): User[] {
    return users.filter((user) =>
      user.invitedVideos.some((invitedVideo) => invitedVideo.id === videoId),
    );
  }
}

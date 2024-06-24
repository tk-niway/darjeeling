import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueUserArgs } from 'src/generated/user/find-unique-user.args';
import { CreateOneUserArgs } from 'src/generated/user/create-one-user.args';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { DeleteOneUserArgs } from 'src/generated/user/delete-one-user.args';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PaginatedUser } from 'src/users/models/paginatedUser.model';
import { UtilsService } from 'src/utils/utils.service';
import { UserModel } from 'src/users/models/user.model';
import { VideoModel } from 'src/videos/models/video.model';
import { VideosService } from 'src/videos/videos.service';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private utilsService: UtilsService,
    private readonly videosService: VideosService,
  ) {}

  @ResolveField(() => [VideoModel], { nullable: true, name: 'OwnVideos' })
  async ownVideos(
    @Parent() user: UserModel,
    @Args() @Args() query: FindManyVideoArgs,
  ) {
    return this.videosService.videos({
      ...query,
      where: { ownerId: { equals: user.id } },
    });
  }

  @Query((returns) => UserModel)
  async user(@Args() { where }: FindUniqueUserArgs): Promise<UserModel> {
    const user = await this.usersService.user(where);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Query((returns) => PaginatedUser)
  async users(
    @Args() { skip, take, cursor, where, orderBy }: FindManyUserArgs,
  ): Promise<PaginatedUser> {
    const users = await this.usersService.users({
      skip,
      take,
      cursor,
      where: { ...where, isActive: true },
      orderBy,
    });

    const totalCount = await this.usersService.totalCount({ where });

    const edges = this.utilsService.generateEdges(users);

    const pageInfo = this.utilsService.generatePageInfo({
      skip,
      take,
      totalCount,
      edges,
    });

    return { edges, pageInfo, totalCount, nodes: users };
  }

  @Mutation((returns) => UserModel)
  async createUser(@Args() { data }: CreateOneUserArgs): Promise<UserModel> {
    return this.usersService.createUser(data);
  }

  @Mutation((returns) => UserModel) async updateUser(
    @CurrentUser() currentUser: UserModel,
    @Args() { data, where }: UpdateOneUserArgs,
  ): Promise<UserModel> {
    if (currentUser.id !== where.id)
      throw new ForbiddenException('You can only update your own user');

    return this.usersService.updateUser({ where, data });
  }

  @Mutation((returns) => UserModel) async deleteUser(
    @CurrentUser() currentUser: UserModel,
    @Args() { where }: DeleteOneUserArgs,
  ): Promise<UserModel> {
    if (currentUser.id !== where.id)
      throw new ForbiddenException('You can only update your own user');

    return this.usersService.deleteUser(where);
  }
}

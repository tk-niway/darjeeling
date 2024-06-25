import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueUserArgs } from 'src/generated/user/find-unique-user.args';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { DeleteOneUserArgs } from 'src/generated/user/delete-one-user.args';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { PaginatedUser } from 'src/users/models/paginatedUser.model';
import { UtilsService } from 'src/utils/utils.service';
import { UserModel } from 'src/users/models/user.model';
import { VideoModel } from 'src/videos/models/video.model';
import { VideosService } from 'src/videos/videos.service';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { MemberGuard } from 'src/common/guards/member.guard';
import { UserCreateInput } from 'src/generated/user/user-create.input';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly videosService: VideosService,
  ) {}

  // ------------------------------
  // ----- Resolver Fields -----
  // ------------------------------

  @ResolveField(() => [VideoModel], {
    name: 'OwnVideos',
    nullable: true,
    description: 'Videos where the user is the owner',
  })
  async ownVideos(
    @Parent() user: UserModel,
    @Args() @Args() query: FindManyVideoArgs,
  ) {
    return this.videosService.videos({
      ...query,
      where: { ownerId: { equals: user.id } },
    });
  }

  @ResolveField(() => [VideoModel], {
    name: 'InvitedVideos',
    nullable: true,
    description: 'Videos where the user is a guest',
  })
  async invitedVideos(
    @Parent() user: UserModel,
    @Args() @Args() query: FindManyVideoArgs,
  ) {
    return this.videosService.videos({
      ...query,
      where: { guests: { some: { id: { equals: user.id } } } },
    });
  }

  // ------------------------------
  // ----- Queries -----
  // ------------------------------

  @Query((returns) => UserModel, { description: 'Find a user by id or email' })
  async user(@Args() query: FindUniqueUserArgs): Promise<UserModel> {
    const user = await this.usersService.user(query);

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

  // ------------------------------
  // ----- Mutations -----
  // ------------------------------

  @UseGuards(MemberGuard)
  @Mutation((returns) => UserModel)
  async createUser(@Args("data") query: UserCreateInput): Promise<UserModel> {
    return this.usersService.createUser(query);
  }

  @UseGuards(MemberGuard)
  @Mutation((returns) => UserModel)
  async updateUser(
    @CurrentUser() currentUser: UserModel,
    @Args() query: UpdateOneUserArgs,
  ): Promise<UserModel> {
    if (currentUser.id !== query.where.id)
      throw new ForbiddenException('You can only update your own user');

    return this.usersService.updateUser(query);
  }

  @UseGuards(MemberGuard)
  @Mutation((returns) => UserModel)
  async deleteUser(
    @CurrentUser() currentUser: UserModel,
    @Args() query: DeleteOneUserArgs,
  ): Promise<UserModel> {
    if (currentUser.id !== query.where.id)
      throw new ForbiddenException('You can only update your own user');

    return this.usersService.deleteUser(query);
  }
}

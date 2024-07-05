import { InvitedVideosDataLoader } from './dataloaders/invitedVideos.dataloader';
import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueUserArgs } from 'src/generated/user/find-unique-user.args';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { DeleteOneUserArgs } from 'src/generated/user/delete-one-user.args';
import { PaginatedUser } from 'src/users/models/paginatedUser.model';
import { UtilsService } from 'src/utils/utils.service';
import { UserModel } from 'src/users/models/user.model';
import { VideoModel } from 'src/videos/models/video.model';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { MemberGuard } from 'src/common/guards/member.guard';
import { UserCreateInput } from 'src/generated/user/user-create.input';
import { OwnVideosDataLoader } from 'src/users/dataloaders/ownVideos.dataloader';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly ownVideosDataLoader: OwnVideosDataLoader,
    private readonly invitedVideosDataLoader: InvitedVideosDataLoader,
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
    @Args() query: FindManyVideoArgs,
  ): Promise<VideoModel[]> {
    query = this.utilsService.findManyArgsValidation(query);

    return await this.ownVideosDataLoader.load({ query, user });
  }

  @ResolveField(() => [VideoModel], {
    name: 'InvitedVideos',
    nullable: true,
    description: 'Videos where the user is a guest',
  })
  async invitedVideos(
    @Parent() user: UserModel,
    @Args() query: FindManyVideoArgs,
  ): Promise<VideoModel[]> {
    query = this.utilsService.findManyArgsValidation(query);

    return await this.invitedVideosDataLoader.load({ query, user });
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

  @Query((returns) => PaginatedUser, { description: 'Find all users' })
  async users(@Args() query: FindManyUserArgs): Promise<PaginatedUser> {
    const { skip, take, cursor, where, orderBy, distinct } =
      this.utilsService.findManyArgsValidation(query);

    const { users, totalCount } = await this.usersService.usersWithCount({
      skip,
      take,
      cursor,
      where: { ...where, isActive: true },
      orderBy,
      distinct,
    });

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
  @Mutation((returns) => UserModel, { description: 'Create a user' })
  async createUser(@Args('data') query: UserCreateInput) {
    const user = await this.usersService.createUser(query);

    if (!user) {
      throw new BadRequestException('User not created');
    }

    return user;
  }

  @UseGuards(MemberGuard)
  @Mutation((returns) => UserModel, { description: 'Update a user' })
  async updateUser(@Args() query: UpdateOneUserArgs): Promise<UserModel> {
    const user = await this.usersService.updateUser(query);

    if (!user) {
      throw new BadRequestException('User not updated');
    }

    return user;
  }

  @UseGuards(MemberGuard)
  @Mutation((returns) => UserModel, { description: 'Delete a user' })
  async deleteUser(@Args() query: DeleteOneUserArgs): Promise<UserModel> {
    const user = await this.usersService.deleteUser(query);

    if (!user) {
      throw new BadRequestException('User not deleted');
    }

    return user;
  }
}

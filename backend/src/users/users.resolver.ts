import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueUserArgs } from 'src/generated/user/find-unique-user.args';
import { CreateOneUserArgs } from 'src/generated/user/create-one-user.args';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { DeleteOneUserArgs } from 'src/generated/user/delete-one-user.args';
import { User } from 'src/generated/user/user.model';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PaginatedUser } from 'src/users/models/paginatedUser.model';
import { UtilsService } from 'src/utils/utils.service';

@Resolver((of: any) => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private utilsService: UtilsService,
  ) {}

  @Query((returns) => User)
  async user(@Args() { where }: FindUniqueUserArgs): Promise<User> {
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

  @Mutation((returns) => User)
  async createUser(@Args() { data }: CreateOneUserArgs): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Mutation((returns) => User) async updateUser(
    @CurrentUser() currentUser: User,
    @Args() { data, where }: UpdateOneUserArgs,
  ): Promise<User> {
    if (currentUser.id !== where.id)
      throw new ForbiddenException('You can only update your own user');

    return this.usersService.updateUser({ where, data });
  }

  @Mutation((returns) => User) async deleteUser(
    @CurrentUser() currentUser: User,
    @Args() { where }: DeleteOneUserArgs,
  ): Promise<User> {
    if (currentUser.id !== where.id)
      throw new ForbiddenException('You can only update your own user');

    return this.usersService.deleteUser(where);
  }
}

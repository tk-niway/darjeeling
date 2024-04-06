import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { UserModel } from './user.model';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueUserArgs } from 'src/generated/user/find-unique-user.args';
import { CreateOneUserArgs } from 'src/generated/user/create-one-user.args';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { DeleteOneUserArgs } from 'src/generated/user/delete-one-user.args';

@Resolver((of: any) => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => UserModel)
  async user(@Args() { where }: FindUniqueUserArgs): Promise<User | null> {
    return this.usersService.user(where);
  }

  @Query((returns) => [UserModel])
  async users(
    @Args() { skip, take, cursor, where, orderBy, distinct }: FindManyUserArgs,
  ): Promise<User[]> {
    return this.usersService.users({ skip, take, cursor, where, orderBy });
  }

  @Mutation((returns) => UserModel)
  async createUser(@Args() { data }: CreateOneUserArgs): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Mutation((returns) => UserModel) async updateUser(
    @Args() { data, where }: UpdateOneUserArgs,
  ): Promise<User> {
    return this.usersService.updateUser({ where, data });
  }

  @Mutation((returns) => UserModel) async deleteUser(
    @Args() { where }: DeleteOneUserArgs,
  ): Promise<User> {
    return this.usersService.deleteUser(where);
  }
}

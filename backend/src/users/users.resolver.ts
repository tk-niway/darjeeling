import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueUserArgs } from 'src/generated/user/find-unique-user.args';
import { CreateOneUserArgs } from 'src/generated/user/create-one-user.args';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { DeleteOneUserArgs } from 'src/generated/user/delete-one-user.args';
import { User } from 'src/generated/user/user.model';

@Resolver((of: any) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  async user(@Args() { where }: FindUniqueUserArgs): Promise<User> {
    return this.usersService.user(where);
  }

  @Query((returns) => [User])
  async users(
    @Args() { skip, take, cursor, where, orderBy }: FindManyUserArgs,
  ): Promise<User[]> {
    return this.usersService.users({ skip, take, cursor, where, orderBy });
  }

  @Mutation((returns) => User)
  async createUser(@Args() { data }: CreateOneUserArgs): Promise<User> {
    return this.usersService.createUser(data);
  }

  //TODO リクエストを送信したユーザーの更新のみ許可する
  @Mutation((returns) => User) async updateUser(
    @Args() { data, where }: UpdateOneUserArgs,
  ): Promise<User> {
    return this.usersService.updateUser({ where, data });
  }

  //TODO リクエストを送信したユーザーの削除のみ許可する
  @Mutation((returns) => User) async deleteUser(
    @Args() { where }: DeleteOneUserArgs,
  ): Promise<User> {
    return this.usersService.deleteUser(where);
  }
}

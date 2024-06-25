import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async totalCount(query: Prisma.UserAggregateArgs): Promise<number> {
    const users = await this.prismaService.user.aggregate({
      where: { ...query.where },
      _count: true,
    });
    return users._count;
  }

  async user(query: Prisma.UserFindUniqueArgs): Promise<UserModel> {
    return await this.prismaService.user.findUnique(query);
  }

  async users(query: Prisma.UserFindManyArgs): Promise<UserModel[]> {
    return await this.prismaService.user.findMany(query);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserModel> {
    return await this.prismaService.user.upsert({
      create: data,
      update: {},
      where: { auth0Id: data.auth0Id, isActive: true },
    });
  }

  async updateUser(query: Prisma.UserUpdateArgs): Promise<UserModel> {
    return await this.prismaService.user.update(query);
  }

  async deleteUser(query: Prisma.UserDeleteArgs): Promise<UserModel> {
    const deletedUser = await this.prismaService.user.delete(query);
    return deletedUser;
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async totalCount(query: Prisma.UserAggregateArgs) {
    const users = await this.prismaService.user.aggregate({
      where: { ...query.where },
      _count: true,
    });
    return users._count;
  }

  async user(query: Prisma.UserFindUniqueArgs) {
    return await this.prismaService.user.findUnique(query);
  }

  async users(query: Prisma.UserFindManyArgs) {
    return await this.prismaService.user.findMany(query);
  }

  async createUser(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.upsert({
      create: data,
      update: {},
      where: { auth0Id: data.auth0Id, isActive: true },
    });
  }

  async updateUser(query: Prisma.UserUpdateArgs) {
    return await this.prismaService.user.update(query);
  }

  async deleteUser(query: Prisma.UserDeleteArgs) {
    const deletedUser = await this.prismaService.user.delete(query);
    return deletedUser;
  }

  async usersWithCount(query: Prisma.UserFindManyArgs) {
    const usersPromise = this.users(query);
    const totalCountPromise = this.totalCount({ where: query.where });

    const [users, totalCount] = await Promise.all([
      usersPromise,
      totalCountPromise,
    ]);
    return { users, totalCount };
  }
}

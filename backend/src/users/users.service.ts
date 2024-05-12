import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/generated/user/user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async totalCount(params: Prisma.UserAggregateArgs): Promise<number> {
    const users = await this.prismaService.user.aggregate({
      where: { ...params.where },
      _count: true,
    });
    return users._count;
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { ...userWhereUniqueInput },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput[];
  }): Promise<User[]> {
    return await this.prismaService.user.findMany({
      ...params,
      where: { ...params.where },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.upsert({
      create: data,
      update: {},
      where: { auth0Id: data.auth0Id, isActive: true },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return await this.prismaService.user.update(params);
  }

  async deleteUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    const deletedUser = await this.prismaService.user.delete({
      where: userWhereUniqueInput,
    });
    return deletedUser;
  }
}

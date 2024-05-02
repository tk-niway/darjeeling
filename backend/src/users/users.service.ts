import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/generated/user/user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: { isActive: true, ...userWhereUniqueInput },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput[];
  }): Promise<User[]> {
    return this.prismaService.user.findMany({
      ...params,
      where: { isActive: true, ...params.where },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.upsert({
      create: data,
      update: {},
      where: { auth0Id: data.auth0Id, isActive: true},
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.prismaService.user.update(params);
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

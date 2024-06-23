import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { videoVisibility } from 'src/generated/prisma/video-visibility.enum';
import { videoUploadStatus } from 'src/generated/prisma/video-upload-status.enum';
import { Video as prismaVideo, } from '@prisma/client';

@ObjectType()
export class VideoModel implements prismaVideo {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  thumbnailUrl!: string | null;

  @Field(() => String, { nullable: true })
  url!: string | null;

  @Field(() => Int, { nullable: true })
  duration!: number | null;

  @Field(() => videoVisibility, { nullable: false, defaultValue: 'private' })
  visibility!: keyof typeof videoVisibility;

  @Field(() => videoUploadStatus, { nullable: false, defaultValue: 'pending' })
  uploadStatus!: keyof typeof videoUploadStatus;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  playCount!: number;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  isActive!: boolean;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}

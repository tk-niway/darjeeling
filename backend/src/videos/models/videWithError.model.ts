import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from 'src/common/models/userError.model';
import { VideoModel } from 'src/videos/models/video.model';

@ObjectType()
export class VideoWithError {
  @Field((type) => VideoModel, { nullable: true })
  video: VideoModel;

  @Field((type) => [UserError], { nullable: true })
  videErrors: UserError[];
}

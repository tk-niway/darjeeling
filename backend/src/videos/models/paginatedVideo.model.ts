import { ObjectType } from '@nestjs/graphql';
import { PaginatedConnection } from 'src/common/models/paginatedConnection.model';
import { VideoModel } from 'src/videos/models/video.model';

@ObjectType()
export class PaginatedVideo extends PaginatedConnection(VideoModel) {}

import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { Public } from 'src/authz/decorators/public.decorator';
import { RefererGuard } from 'src/common/guards/referer.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { VideosService } from 'src/videos/videos.service';
import { User } from 'src/generated/user/user.model';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @UseGuards(new RefererGuard(['http://localhost:3000/']))
  @Get(':videoId')
  async streamVideo(
    @Param('videoId') videoId: string,
    @Res() res: Response,
    @CurrentUser() currentUser: User,
  ) {
    console.log('Streaming video', { videoId });
    const filePath = this.videosService.getVideo(videoId);

    if (filePath === null) return new NotFoundException('Video not found');

    const baseURL = 'http://localhost:3333/videos/';
    const filename = filePath.split('/').pop();
    const dirname = filename.split('.')[0];

    return res.send(baseURL + dirname + '/' + filename);
  }

  @UseGuards(new RefererGuard(['http://localhost:3000/']))
  @Get(':videoId/:filename')
  async partialVideo(
    @Param('videoId') videoId: string,
    @Param('filename') filename: string,
    @Res() res: Response,
    @CurrentUser() currentUser: User,
  ) {
    console.log('streamingvideo', { videoId, filename, currentUser });
    const filePath = this.videosService.getVideoFile(videoId, filename);

    if (filePath === null) return new NotFoundException('Video not found');

    const stream = createReadStream(filePath);

    return res.header('Content-Type', 'application/octet-stream').send(stream);
  }
}

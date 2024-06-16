import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { Public } from 'src/authz/decorators/public.decorator';
import { VideosService } from 'src/videos/videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Public()
  @Get(':videoId')
  async streamVideo(@Param('videoId') videoId: string, @Res() res: Response) {
    console.log('Streaming video', { videoId });
    const filePath = this.videosService.getVideo(videoId);

    if (filePath === null) return new NotFoundException('Video not found');

    const stream = createReadStream(resolve(filePath));

    return new StreamableFile(stream);
  }
}

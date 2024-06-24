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
import { RefererGuard } from 'src/common/guards/referer.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { VideosService } from 'src/videos/videos.service';
import { User } from 'src/generated/user/user.model';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @UseGuards(RefererGuard)
  @Get(':videoId')
  async m3u8(
    @Param('videoId') videoId: string,
    @Res() res: Response,
    @CurrentUser() currentUser: User,
  ) {
    const url = await this.videosService.m3u8Url(videoId);

    console.log({ url });
    if (url === null) return new NotFoundException('Video not found');

    return res.send(url);
  }

  @UseGuards(RefererGuard)
  @Get(':videoId/:filename')
  async streamVideo(
    @Param('videoId') videoId: string,
    @Param('filename') filename: string,
    @Res() res: Response,
    @CurrentUser() currentUser: User,
  ) {
    const filePath = await this.videosService.videoFile(videoId, filename);

    if (filePath === null) return new NotFoundException('Video not found');

    const stream = createReadStream(filePath);

    return res.header('Content-Type', 'application/octet-stream').send(stream);
  }
}

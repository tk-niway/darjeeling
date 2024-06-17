import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { Public } from 'src/authz/decorators/public.decorator';
import { VideosService } from 'src/videos/videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  //TODO CORS設定をしててもブラウザから直接URLアクセスするとエラーにならずファイルダウンロードできるのでフロントエンド以外からはバックエンドにアクセスできないようにする
  @Public()
  @Get(':videoId')
  async streamVideo(@Param('videoId') videoId: string, @Res() res: Response) {
    console.log('Streaming video', { videoId });
    const filePath = this.videosService.getVideo(videoId);

    if (filePath === null) return new NotFoundException('Video not found');

    const baseURL = 'http://localhost:3333/videos/';
    // const baseURL = 'http://localhost:3333/files/';
    const filename = filePath.split('/').pop();
    const filenamewithoutext = filename.split('.')[0];
    const stream = createReadStream(resolve(filePath));

    return res.send(baseURL + filenamewithoutext + '/' + filename);
  }

  //TODO ユーザーを確認して動画を再生できるようにするためにPublicでもrequestにユーザー情報をもたせるようにする
  @Public()
  @Get(':videoId/:filename')
  async partialVideo(
    @Param('videoId') videoId: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    console.log('partialVideo', { videoId, filename });

    const filePath = this.videosService.getVideoFile(videoId, filename);

    if (filePath === null) return new NotFoundException('Video not found');

    const stream = createReadStream(filePath);

    return res.header('Content-Type', 'application/octet-stream').send(stream);
  }
}

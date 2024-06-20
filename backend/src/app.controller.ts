import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return 'OK';
  }
}

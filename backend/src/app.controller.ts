import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Public } from 'src/authz/decorators/public.decorator';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  healthCheck(): string {
    return 'OK';
  }
}

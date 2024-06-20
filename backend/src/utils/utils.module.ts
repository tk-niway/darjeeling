import { Global, Module } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';

@Global()
@Module({
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}

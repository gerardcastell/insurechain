import { Module } from '@nestjs/common';
import { BackendUtilsService } from './backend-utils.service';

@Module({
  controllers: [],
  providers: [BackendUtilsService],
  exports: [BackendUtilsService],
})
export class BackendUtilsModule {}

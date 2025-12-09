import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { S3Provider } from './s3.provider';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, S3Provider],
  exports: [S3Provider],
})
export class UploadsModule {}

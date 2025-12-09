import { Controller, Post, Body } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateUploadUrlDto } from './dto/create-upload-url.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presigned-url')
  createPreSignedUrl(@Body() createUploadUrlDto: CreateUploadUrlDto) {
    return this.uploadsService.createPreSignedUrl(createUploadUrlDto);
  }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreatePresignedUrlDto } from './dto/create-presigned-url.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presigned-url')
  createPreSignedUrl(@Body() createPresignedUrlDto: CreatePresignedUrlDto) {
    return this.uploadsService.createPreSignedUrl(createPresignedUrlDto);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { CreatePresignedUrlDto } from './dto/create-presigned-url.dto';

@Injectable()
export class UploadsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('S3_CLIENT') private readonly s3Client: S3Client,
  ) {}

  async createPreSignedUrl(createUploadUrlDto: CreatePresignedUrlDto) {
    const { filename, contentType } = createUploadUrlDto;
    const uniqueFilename = `${randomUUID()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME'),
      Key: uniqueFilename,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    });

    return {
      uploadUrl: signedUrl,
      fileUrl: `${this.configService.getOrThrow<string>('PUBLIC_URL')}/${this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME')}/${uniqueFilename}`,
    };
  }
}

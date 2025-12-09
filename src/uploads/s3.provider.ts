import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

export const S3Provider: Provider = {
  provide: 'S3_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      region: configService.getOrThrow<string>('AWS_REGION'),
      endpoint: configService.getOrThrow<string>('AWS_S3_ENDPOINT'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  },
  inject: [ConfigService],
};


import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePresignedUrlDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}


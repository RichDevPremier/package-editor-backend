import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}


import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  modelUrl: string;

  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string;
}


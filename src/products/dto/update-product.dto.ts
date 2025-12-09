import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsUrl()
  @IsOptional()
  configUrl?: string;
}


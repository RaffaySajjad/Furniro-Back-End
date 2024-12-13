import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  currentPrice?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

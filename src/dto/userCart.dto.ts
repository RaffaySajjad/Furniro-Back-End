import { IsString, IsInt } from 'class-validator';

export class UserCartDTO {
  @IsString()
  productId: string;

  @IsInt()
  qty: number;
}

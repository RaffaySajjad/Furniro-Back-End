import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ required: false, default: 0 })
  discount: number;

  @Prop({ required: false, default: false })
  isNew: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

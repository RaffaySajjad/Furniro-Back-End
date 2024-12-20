import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/auth/enums/role.enum';

interface CartItem {
  id: string;
  qty: number;
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ id: String, qty: Number }] })
  cart: CartItem[];

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];

  @Prop({ type: [{ id: String }], required: false })
  favorites: String[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Product, ProductSchema } from 'src/schemas/Product.model';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    JwtService,
    ProductService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ProductModel {}

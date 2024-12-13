import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModel } from './products/product.module';
import { UserModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost/test'),
    UserModule,
    ProductModel,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateProductDTO } from 'src/dto/updateProduct.dto';
import { CreateProductDTO } from '../dto/createProduct.dto';
import { ProductService } from './products.service';
@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post('createProduct')
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDTO: CreateProductDTO) {
    return this.productService.createProduct(createProductDTO);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('getProducts')
  @Roles(Role.Admin, Role.User)
  getProducts() {
    return this.productService.getProducts();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('product/:id')
  async getProductById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Product not found', 404);
    const findProduct = await this.productService.getProductByID(id);
    if (!findProduct) throw new HttpException('Product not found', 404);
    return findProduct;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete('deleteProduct/:id')
  async deleteProduct(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Product not found', 404);
    return this.productService.deleteProduct(id);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Put('updateProduct/:id')
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Product not found', 404);

    return this.productService.updateProduct(id, updateProductDTO);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('getAllProducts')
  getUsers() {
    return this.productService.getAllProducts();
  }
}

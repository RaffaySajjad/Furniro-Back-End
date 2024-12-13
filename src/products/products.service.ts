import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDTO } from 'src/dto/updateProduct.dto';
import { Product } from 'src/schemas/Product.model';
import { CreateProductDTO } from '../dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  createProduct(createProductDTO: CreateProductDTO) {
    const newProduct = new this.productModel(createProductDTO);
    return newProduct.save();
  }
  deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
  getProducts() {
    return this.productModel.find();
  }
  getProductByID(id: string) {
    return this.productModel.findById(id);
  }
  async updateProduct(id: string, updateProductDTO: UpdateProductDTO) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new HttpException('Product not found', 404);
    }
    Object.assign(product, updateProductDTO);
    return product.save();
  }
  async getAllProducts() {
    return this.productModel.find();
  }
}

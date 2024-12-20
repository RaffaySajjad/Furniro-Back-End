import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserCartDTO } from 'src/dto/userCart.dto';
import { CartItem, UserService } from './users.service';
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('getCart')
  async getCart(@Query('email') email: string): Promise<{ cart: CartItem[] }> {
    const userCart = await this.userService.getUserCart(email);
    if (!userCart) throw new HttpException('User not found', 404);
    return { cart: userCart };
  }

  @Get('getUserRole')
  async getUserRole(@Query('email') email: string) {
    return this.userService.getUserRole(email);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Patch('updateCart')
  async updateCart(
    @Body('email') email: string,
    @Body() userCart: UserCartDTO,
  ) {
    const updatedUser = await this.userService.updateUserCart(email, userCart);
    return { message: 'Cart updated successfully', updatedUser };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('removeProduct/:userEmail/:productId')
  async removeProductFromCart(
    @Param('userEmail') userEmail: string,
    @Param('productId') productId: string,
  ) {
    try {
      const updatedCart = await this.userService.removeProductFromCart(
        userEmail,
        productId,
      );
      return updatedCart;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete('removeFavorite/:userEmail/:productId')
  async removeFromFavorites(
    @Param('userEmail') userEmail: string,
    @Param('productId') productId: string,
  ) {
    this.userService.removeFromFavorites(userEmail, productId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('getAllUsers')
  getUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get('userDetails')
  async getUserDetails(@Query('email') email: string) {
    return this.userService.userDetails(email);
  }

  @Post('addFavorite/:email/:productId')
  async addFavorite(
    @Param('email') email: string,
    @Param('productId') productId: string,
  ) {
    return await this.userService.addFavorites(email, productId);
  }
}

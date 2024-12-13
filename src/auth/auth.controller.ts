import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginUserDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDTO: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.signUp(signUpDTO);
  }
  @Post('/login')
  login(@Body() loginUserDTO: LoginUserDTO): Promise<{ token: string }> {
    return this.authService.login(loginUserDTO);
  }

  @Get('/userInfo')
  getUserEmail(@Query('token') token: string) {
    return this.authService.decodeToken(token);
  }
}

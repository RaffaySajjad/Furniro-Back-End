import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.model';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginUserDTO } from './dto/login.dto';
import { UserToken } from './guards/roles.guard';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDTO: CreateUserDTO): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDTO;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }
  async login(loginDTO: LoginUserDTO): Promise<{ token: string }> {
    const { email, password } = loginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }
  async decodeToken(token: string): Promise<UserToken> {
    try {
      const decodedToken = this.jwtService.decode(token);
      if (!decodedToken || !decodedToken.id) {
        throw new UnauthorizedException('Invalid token');
      }
      const user: UserToken = await this.userModel.findById(decodedToken.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BackendUsersService } from './backend-users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: BackendUsersService,
    private jwtService: JwtService
  ) {}

  async signup(payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return user;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

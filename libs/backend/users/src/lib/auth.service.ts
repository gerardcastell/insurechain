import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BackendUsersService } from './backend-users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: BackendUsersService,
    private jwtService: JwtService
  ) {}

  async signup(email, password) {
    const user = await this.usersService.create(email, password);
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

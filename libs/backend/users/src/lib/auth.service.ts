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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BackendUsersService } from '../users/backend-users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: BackendUsersService,
    private jwtService: JwtService
  ) {}

  async signUp(address: string) {
    const userFound = await this.usersService.findOneByAddress(address);
    if (userFound) {
      throw new BadRequestException('Address already in use');
    }
    const user = await this.usersService.create(address);
    return user;
  }

  async signIn(address: string) {
    let user = await this.usersService.findOneByAddress(address);
    if (!user) {
      user = await this.usersService.create(address);
    }
    const payload = { address: user.address, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(address: string): Promise<Pick<User, 'address'>> {
    const user = await this.usersService.findOneByAddress(address);
    console.log({ user });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

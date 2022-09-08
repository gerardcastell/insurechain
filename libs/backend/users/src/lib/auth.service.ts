import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { BackendUsersService } from './backend-users.service';
import { promisify } from 'util';
import { User } from '@prisma/client';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private usersService: BackendUsersService,
    private jwtService: JwtService
  ) {}

  async signup(email: string, password: string, name: string) {
    //see if email is in use
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    //Hash the users password
    // Generate a salts
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hash result and the salt together
    const result = salt + '.' + hash.toString('hex');
    // Create anew user and save it
    const user = await this.usersService.create(email, result, name);
    //  const user = await this.usersService.create(email, password, name);
    // return the user
    return user;
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (user && storedHash === hash.toString('hex')) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

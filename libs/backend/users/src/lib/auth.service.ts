import { Injectable } from '@nestjs/common';
import { BackendUsersService } from './backend-users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: BackendUsersService) {}

  async signup(email, password) {
    const user = await this.usersService.create(email, password);
    return user;
  }
}

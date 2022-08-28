import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { BackendUsersService } from './backend-users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: BackendUsersService
  ) {}

  @Get('/:id')
  async findUser(@Param('id') id) {
    const user = await this.usersService.findUser(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    return user;
  }
}

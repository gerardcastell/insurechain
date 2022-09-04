import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { BackendUsersService } from './backend-users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { SigninDto } from './dtos/Signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/passport-auth.guard';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: BackendUsersService
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() body: SigninDto, @Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Finds user by ID. This method has to be the last one since it could
   * mask the other routes
   * @param id user id
   * @returns User entity if it is found
   */
  @Get('/:id')
  async findUser(@Param('id') id) {
    const user = await this.usersService.findOneById(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

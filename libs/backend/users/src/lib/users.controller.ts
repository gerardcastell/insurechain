import { BackendUtilsService } from '@insurechain/backend/utils';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/CreateUser.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/passport-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { BackendUsersService } from './services/users/backend-users.service';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: BackendUsersService,
    private utilsService: BackendUtilsService
  ) {}

  @Post('/signup')
  async createUser(@Body() body: UserDto) {
    const user = await this.authService.signup(body.email, body.password);
    const userWoPassword = this.utilsService.exclude(user, 'password');
    return userWoPassword;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() body: UserDto, @Request() req) {
    return this.authService.signIn(req.user);
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

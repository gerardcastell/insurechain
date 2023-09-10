import { BackendUtilsService } from '@insurechain/backend/utils';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SiweMessage, generateNonce as generateNonceSiwe } from 'siwe';
import { UserDto } from './dtos/CreateUser.dto';
import { JwtAuthGuard } from './guards/passport-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { NonceService } from './services/nonce/nonce.service';
import { BackendUsersService } from './services/users/backend-users.service';
@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: BackendUsersService,
    private utilsService: BackendUtilsService,
    private readonly nonceService: NonceService
  ) {}

  @Post('/signup')
  async createUser(@Body() body: UserDto) {
    const user = await this.authService.signUp(body.address);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: UserDto) {
    return this.authService.signIn(body.address);
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

  @Post('generate-nonce')
  generateNonce(): string {
    // Generate a unique nonce (e.g., using a UUID library)
    const nonce = generateNonceSiwe();
    // Add the nonce to the store
    this.nonceService.addNonce(nonce);
    return nonce;
  }

  @Post('authenticate')
  async authenticateWithNonce(@Body() body) {
    const { message, signature } = body;
    const siweMessage = new SiweMessage(JSON.parse(message));
    try {
      // Verify the signature using the public key
      await siweMessage.verify({ signature });
      // Validate and remove the nonce from the store
      const isValid = this.nonceService.validateAndRemoveNonce(
        siweMessage.nonce
      );
      if (isValid) {
        // Proceed with authentication logic
        return this.authService.signIn(siweMessage.address);
      } else {
        throw new UnauthorizedException('Authentication failed: Nonce invalid');
      }
    } catch {
      throw new UnauthorizedException(
        'Authentication failed: Signature invalid'
      );
    }
  }
}

import { BackendUtilsService } from '@insurechain/backend/utils';
import {
  Body,
  Controller,
  Get,
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
import { LocalAuthGuard } from './guards/local-auth.guard';
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
    console.log({ message, signature });
    const siweMessage = new SiweMessage(JSON.parse(message));
    console.log(siweMessage);
    try {
      // Verify the signature using the public key
      await siweMessage.verify({ signature });
      // Validate and remove the nonce from the store
      const isValid = this.nonceService.validateAndRemoveNonce(
        siweMessage.nonce
      );
      if (isValid) {
        const address = siweMessage.address;
        // Proceed with authentication logic
        return { result: 'Authentication successful', address };
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

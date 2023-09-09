import { BackendPrismaModule } from '@insurechain/backend/prisma';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { GUARDS } from './guards';
import { STRATEGIES } from './passport-strategies';

import { BackendUtilsModule } from '@insurechain/backend/utils';
import { AuthService } from './services/auth/auth.service';
import { NonceService } from './services/nonce/nonce.service';
import { BackendUsersService } from './services/users/backend-users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    BackendUsersService,
    AuthService,
    NonceService,
    ...STRATEGIES,
    ...GUARDS,
  ],
  exports: [BackendUsersService, ...GUARDS],
  imports: [
    BackendPrismaModule,
    BackendUtilsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class BackendUsersModule {}

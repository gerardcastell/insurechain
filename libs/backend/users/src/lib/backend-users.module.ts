import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BackendPrismaModule } from '@insurechain/backend/prisma';

import { GUARDS } from './guards';
import { STRATEGIES } from './passport-strategies';

import { UsersController } from './users.controller';
import { AuthService } from './services/auth/auth.service';
import { BackendUsersService } from './services/users/backend-users.service';
import { BackendUtilsModule } from '@insurechain/backend/utils';

@Module({
  controllers: [UsersController],
  providers: [BackendUsersService, AuthService, ...STRATEGIES, ...GUARDS],
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

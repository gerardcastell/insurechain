import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BackendPrismaModule } from '@insurechain/backend/prisma';

import { AuthService } from './auth.service';
import { BackendUsersService } from './backend-users.service';

import { GUARDS } from './guards';
import { STRATEGIES } from './passport-strategies';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [BackendUsersService, AuthService, ...STRATEGIES, ...GUARDS],
  exports: [BackendUsersService, ...GUARDS],
  imports: [
    BackendPrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class BackendUsersModule {}

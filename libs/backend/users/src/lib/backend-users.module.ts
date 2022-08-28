import { BackendPrismaModule } from '@insurechain/backend/prisma';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BackendUsersService } from './backend-users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [BackendUsersService, AuthService],
  exports: [BackendUsersService],
  imports: [BackendPrismaModule],
})
export class BackendUsersModule {}

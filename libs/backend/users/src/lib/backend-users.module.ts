import { Module } from '@nestjs/common';
import { BackendUsersService } from './backend-users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [BackendUsersService],
  exports: [BackendUsersService],
})
export class BackendUsersModule {}

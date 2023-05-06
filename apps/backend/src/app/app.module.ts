import { BackendPoliciesModule } from '@insurechain/backend/policies';
import { BackendProposalsModule } from '@insurechain/backend/proposals';
import { BackendUsersModule } from '@insurechain/backend/users';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendHealthModule } from '@insurechain/backend/health';

@Module({
  imports: [
    BackendHealthModule,
    BackendUsersModule,
    BackendPoliciesModule,
    BackendProposalsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env['NODE' + '_ENV']
        ? `.env.${process.env['NODE' + '_ENV']}`
        : '.env.development',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        skipMissingProperties: false,
      }),
    },
  ],
})
export class AppModule {}

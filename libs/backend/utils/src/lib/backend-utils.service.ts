import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendUtilsService {
  // Exclude keys from user
  exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}

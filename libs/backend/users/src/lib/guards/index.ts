import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './passport-auth.guard';

export const GUARDS = [LocalAuthGuard, JwtAuthGuard];

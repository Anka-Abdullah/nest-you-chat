 import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
 
-@Module({})
@Module({
  imports: [PassportModule, UsersModule],
  providers: [JwtStrategy],
  exports: [PassportModule]
})
 export class CommonModule {}

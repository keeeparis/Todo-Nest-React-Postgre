import * as dotenv from 'dotenv'
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` })

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '30min'
      }
    })
  ],
  exports: [JwtModule, AuthService]
})
export class AuthModule {}

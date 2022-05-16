import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'secretPassword',
    signOptions: { expiresIn: '3600s' }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Solicitation from 'src/credit-card/solicitation.entity';
import User from 'src/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}

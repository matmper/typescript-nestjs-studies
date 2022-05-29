import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/user.entity';
import Solicitation from './solicitation.entity';
import { CreditCardService } from './credit-card.service';
import { UserService } from 'src/user/user.service';
import CreditCard from './credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Solicitation, CreditCard])],
  controllers: [CreditCardController],
  providers: [CreditCardService, UserService],
})
export class CreditCardModule {}

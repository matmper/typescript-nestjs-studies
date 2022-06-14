import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import Solicitation from 'src/credit-card/solicitation.entity';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import Bill from './bill.entity';
import { BillService } from './bill.service';
import BillTask from './bill.task';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, User, Solicitation, CreditCard])],
  providers: [BillService, BillTask, UserService, CreditCardService],
  controllers: [],
  exports: [TypeOrmModule.forFeature([Bill])],
})
export class BillModule {}

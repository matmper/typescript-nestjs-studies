import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import Transaction from 'src/transaction/transaction.entity';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, CreditCard])],
  controllers: [StatementController],
  providers: [StatementService],
})
export class StatementModule {}

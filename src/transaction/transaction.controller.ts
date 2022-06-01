import { Body, Controller, Post } from '@nestjs/common';
import CreateTransactionDTO from './types/create-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { IsPublic } from 'src/auth/is-public.decorator';

@ApiTags('Transações')
@IsPublic()
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createTransaction(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionService.createTransaction(createTransactionDTO);
  }
}

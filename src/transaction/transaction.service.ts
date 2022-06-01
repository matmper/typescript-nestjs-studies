import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { Repository } from 'typeorm';
import Transaction from './transaction.entity';
import CreateTransactionDTO from './types/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDTO) {
    const { credit_card, value } = createTransactionDto;

    const creditCard = await this.creditCardRepository.findOne({
      number: credit_card,
    });

    if (!creditCard) {
      throw new BadRequestException(
        'Cartão de crédito inválido ou inexistente',
      );
    }

    if (creditCard.disponible < value) {
      throw new BadRequestException('Limite indisponível');
    }

    const entity = this.transactionRepository.create({
      value: value,
      credit_card: creditCard,
    });

    this.creditCardRepository.update(creditCard.id, {
      disponible: creditCard.disponible - value,
    })

    return this.transactionRepository.save(entity);
  }
}

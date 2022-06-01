import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import Transaction from 'src/transaction/transaction.entity';
import PaginateResultDTO from 'src/types/paginate-result.dto';
import User from 'src/user/user.entity';
import { Repository } from 'typeorm';
import StatementFilterDTO from './types/statement-filter.dto';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  /**
   * Retorna uma listagem do extrato filtrado
   */
  async paginate(params: StatementFilterDTO) {
    const { from, to, page, limit } = params;

    const creditCard = await this.validateCreditCard(params.credit_card);

    const skip = limit * (page - 1);

    const queryBuilder =
      this.transactionRepository.createQueryBuilder('transaction');

    const [result, count] = await queryBuilder
      .where('transaction.created_at between :from AND :to', { from, to })
      .andWhere('transaction.credit_card_id = :creditCard', { creditCard })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return new PaginateResultDTO<Transaction>(result, page, count);
  }

  /**
   * Valida se o cartão de crédito é válido e do usuário, retornando o seu id
   */
  private async validateCreditCard(creditCardNumber: string): Promise<number> {
    const queryBuilder =
      this.creditCardRepository.createQueryBuilder('credit_card');

    const creditCard = await queryBuilder
      .select('credit_card.id')
      .where('credit_card.number = :creditCardNumber', { creditCardNumber })
      //.andWhere('credit_card.user_id = :userId', { userId })
      .getOne();

    if (!creditCard) {
      throw new NotFoundException(
        'Cartão de crédito inválido ou não encontrado',
      );
    }

    return creditCard.id;
  }
}

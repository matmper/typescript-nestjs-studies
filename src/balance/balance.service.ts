import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  /**
   * Retorna o crédito disponível de acordo com o cartão
   */
  async getBalanceByCardNumber(creditCardNumber: string): Promise<number> {
    const creditCard = await this.validateCreditCard(creditCardNumber);

    return creditCard.disponible;
  }

  /**
   * Valida se o cartão de crédito é válido e do usuário, retornando o seu objeto
   */
  private async validateCreditCard(creditCardNumber: string): Promise<any> {
    const queryBuilder =
      this.creditCardRepository.createQueryBuilder('credit_card');

    const creditCard = await queryBuilder
      .select('credit_card.disponible')
      .where('credit_card.number = :creditCardNumber', { creditCardNumber })
      //.andWhere('credit_card.user_id = :userId', { userId })
      .getOne();

    if (!creditCard) {
      throw new NotFoundException(
        'Cartão de crédito inválido ou não encontrado',
      );
    }

    return creditCard;
  }
}

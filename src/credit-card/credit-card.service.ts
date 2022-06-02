import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import Solicitation from './solicitation.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import SolicitationStatus from './enum/solicitation-status.enum';
import CreditCard from './credit-card.entity';
import { addYears } from 'date-fns';
import Brands from './enum/brands.enum';
import User from 'src/user/user.entity';
import generateCreditCard from './helpers/generate-credit-card.helper';
import generateCreditCardCvv from './helpers/generate-credit-card-cvv.helper';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    private userService: UserService,
  ) {}

  /**
   * Cadastra um usuário e sua solicitação de transação
   * @param creditCardRequest
   * @returns
   */
  async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
    const userExists = await this.userService.verifyUserExists(
      creditCardRequest.email,
      creditCardRequest.cpf,
    );

    if (userExists) {
      throw new BadRequestException(
        `Usuário [${userExists.type}] já cadastrado em nossa base de dados`,
      );
    }

    const score = this.requestScore();
    const approved = score >= 600;

    const user = await this.userService.createUser(
      {
        email: creditCardRequest.email,
        name: creditCardRequest.name,
        password: creditCardRequest.password,
        cpf: creditCardRequest.cpf,
      },
      approved,
    );

    const solicitationEntity = this.solicitationRepository.create({
      preferredDueDay: creditCardRequest.preferredDueDay,
      user: user,
      status: approved
        ? SolicitationStatus.APPROVED
        : SolicitationStatus.DENIED,
    });

    const solicitation = await this.solicitationRepository.save(
      solicitationEntity,
    );

    let card = null;

    if (approved) {
      card = await this.generateCreditCardForApproved(user);
    }

    return {
      solicitation: solicitation,
      score: score,
      approved: approved,
      card: card,
    };
  }

  /**
   * Gera um novo cartão de crédito quando a solicitação for aprovada
   * @returns
   */
  private async generateCreditCardForApproved(user: User) {
    const DEFAULT_BRAND = Brands.VISA;

    return await this.creditCardRepository.save(
      this.creditCardRepository.create({
        valid_until: addYears(new Date(), 5),
        number: generateCreditCard(DEFAULT_BRAND),
        cvv: generateCreditCardCvv(),
        brand: DEFAULT_BRAND,
        user,
      }),
    );
  }

  /**
   * Retorna um score de 0 a 1000
   * @returns
   */
  private requestScore(): number {
    return this.randomIntFromInterval(0, 1000);
  }

  /**
   * Retorna um número aleatório com min e max
   * @param min
   * @param max
   * @returns
   */
  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Retorna o dia de vencimento do usuário
   * @param user
   */
  async getUserPreferredDueDay(user: User): Promise<number> {
    const solicitation = await this.solicitationRepository
      .createQueryBuilder('solicitation')
      .select('solicitation.preferredDueDay')
      .where('user_id = :userId', { userId: user.id })
      .andWhere('solicitation.status = :status', {
        status: SolicitationStatus.APPROVED,
      })
      .getOne();

    if (solicitation) {
      return solicitation.preferredDueDay;
    }

    return 10;
  }
}

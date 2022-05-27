import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import Solicitation from './solicitation.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import SolicitationStatus from './enum/solicitation-status.enum';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
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

    const user = await this.userService.createUser({
      email: creditCardRequest.email,
      name: creditCardRequest.name,
      password: creditCardRequest.password,
      cpf: creditCardRequest.cpf,
    });

    const score = this.requestScore();
    const approved = score >= 600;

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

    return {
      solicitation: solicitation,
      score: score,
      approved: approved,
    };
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
}

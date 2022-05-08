import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/user/user.entity';
import Solicitation from './solicitation.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import SolicitationStatus from './enum/solicitation-status.enum';

@Injectable()
export class CreditCardService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Solicitation) private solicitationRepository: Repository<Solicitation>
    ) {}

    /**
     * Cadastra um usuário e sua solicitação de transação
     */
    async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
        const user = await this.userRepository.save(
            this.userRepository.create({
                name: creditCardRequest.name,
                cpf: creditCardRequest.cpf,
                email: creditCardRequest.email,
                password: creditCardRequest.password,
            })
        );

        const score = this.requestScore();
        const approved = score >= 600;

        const solicitation = await this.solicitationRepository.save(
            this.solicitationRepository.create({
                preferredDueDay: creditCardRequest.preferredDueDay,
                user: user,
                status: approved ? SolicitationStatus.APPROVED : SolicitationStatus.DENIED,
            })
        );

        return {
            user: user,
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

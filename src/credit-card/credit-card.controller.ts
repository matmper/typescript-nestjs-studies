import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Solicitation } from './solicitation.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';

@ApiTags('Requisição')
@Controller('credit-card')
export class CreditCardController {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Solicitation) private solicitationRepository: Repository<Solicitation>
    ) {}

    @Post('request')
    async request(@Body() credirCardRequest: CreditCardRequestDTO) {
        const user = await this.userRepository.save(
            this.userRepository.create({
                name: credirCardRequest.name,
                cpf: credirCardRequest.cpf,
                email: credirCardRequest.email,
                password: credirCardRequest.password,
            })
        );

        const solicitation = await this.solicitationRepository.save(
            this.solicitationRepository.create({
                preferredDueDay: credirCardRequest.preferredDueDay,
                user: user,
            })
        );

        return {
            user: user,
            solicitation: solicitation
        }
    }
}

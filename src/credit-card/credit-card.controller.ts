import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import { CreditCardService } from './credit-card.service';

@ApiTags('Requisição')
@Controller('credit-card')
export class CreditCardController {
    constructor(
        private creditCardService: CreditCardService
    ) {}

    @Post('request')
    async request(@Body() creditCardRequest: CreditCardRequestDTO) {
        const solicitation = await this.creditCardService.createSolicitation(
            creditCardRequest,
        );

        return {
            solicitation: solicitation
        }
    }
}

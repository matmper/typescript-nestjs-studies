import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import { CreditCardService } from './credit-card.service';
import { IsPublic } from '../auth/is-public.decorator';

@ApiTags('Cartões')
@Controller('credit-card')
export class CreditCardController {
  constructor(private creditCardService: CreditCardService) {}

  /**
   * Rota que realiza uma requisição de transação
   * @param creditCardRequest
   * @returns
   */
  @IsPublic()
  @Post('request')
  async request(@Body() creditCardRequest: CreditCardRequestDTO) {
    const solicitation = await this.creditCardService.createSolicitation(
      creditCardRequest,
    );

    return {
      success: true,
      message: 'solicitação realizada com sucesso',
      data: solicitation,
    };
  }
}

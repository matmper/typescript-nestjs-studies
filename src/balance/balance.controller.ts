import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import GetBalanceDTO from './types/get-balance.dto';

@ApiTags('Saldos')
@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get('card/:creditCardNumber')
  async getBalance(@Param('creditCardNumber') creditCardNumber: string) {
    const balance = await this.balanceService.getBalanceByCardNumber(
      creditCardNumber,
    );

    const dispible = new GetBalanceDTO(creditCardNumber, balance);

    return {
      success: true,
      message: 'saldo disponível resgatado com sucesso',
      data: dispible,
    };
  }
}

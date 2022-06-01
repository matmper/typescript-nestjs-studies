import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatementService } from './statement.service';
import StatementFilterDTO from './types/statement-filter.dto';

@ApiTags('Extratos')
@Controller('statement')
@ApiBearerAuth('JWT')
export class StatementController {
  constructor(private statementService: StatementService) {}
  /**
   * Captura um extrato das faturas do cartão
   * @param params
   * @returns
   */
  @Get()
  async getStatement(@Query() params: StatementFilterDTO) {
    const statements = await this.statementService.paginate(params);

    return {
      success: true,
      message: 'extrato capturado com sucesso',
      data: {
        result: statements,
        params: params,
      },
    };
  }
}

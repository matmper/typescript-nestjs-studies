import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { format, lastDayOfMonth } from 'date-fns';

class StatementFilterDTO {
  @ApiProperty({ description: 'Cartão de crédito a ser visualizado o extrato' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(16, 16, {
    message: 'credit_card must be equal to 16 characters (number)',
  })
  credit_card: string;

  @ApiProperty({
    default: format(new Date(), 'yyyy-MM-dd'),
    description: 'data inicial do filtro',
  })
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty({
    default: format(lastDayOfMonth(new Date()), 'yyyy-MM-dd'),
    description: 'data inicial do filtro',
  })
  @IsNotEmpty()
  @IsDateString()
  to: Date;

  @ApiProperty({
    default: 1,
    description: 'paginação do extrato',
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    default: 25,
    description: 'número de itens por página do filtro',
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;
}

export default StatementFilterDTO;

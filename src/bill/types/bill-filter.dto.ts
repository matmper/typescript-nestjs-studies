import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { format, lastDayOfMonth } from 'date-fns';

class BillFilterDTO {
  @ApiProperty({
    default: format(new Date(), 'yyyy-MM-dd'),
    description: 'data inicial do filtro de fatura',
  })
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty({
    default: format(lastDayOfMonth(new Date()), 'yyyy-MM-dd'),
    description: 'data inicial do filtro de faturas',
  })
  @IsNotEmpty()
  @IsDateString()
  to: Date;
}

export default BillFilterDTO;

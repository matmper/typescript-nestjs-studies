import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  Length,
  Min,
  IsNumberString,
} from 'class-validator';

class CreateTransactionDTO {
  @ApiProperty({ description: 'Cartão de crédito utilizado no ato de compra' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(16, 16, {
    message: 'credit_card must be equal to 16 characters (number)',
  })
  credit_card: string;

  @ApiProperty({ description: 'Valor total da compra (0.00)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  value: number;
}

export default CreateTransactionDTO;

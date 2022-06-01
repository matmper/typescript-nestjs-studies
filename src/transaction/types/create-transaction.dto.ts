import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

class CreateTransactionDTO {
  @ApiProperty({ description: 'Cartão de crédito utilizado no ato de compra' })
  @IsNotEmpty()
  credit_card: string;

  @ApiProperty({ description: 'Valor total da compra (0.00)' })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export default CreateTransactionDTO;

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsNumberString,
  IsInt,
  Min,
  Max,
  Length,
  MinLength,
} from 'class-validator';

class CreditCardRequestDTO {
  @ApiProperty({
    default: 5,
    description: 'dia de pagamento da fatura',
  })
  @IsInt()
  @Min(1)
  @Max(31)
  preferredDueDay: number;

  @ApiProperty({
    description: 'nome do usuário',
  })
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description: 'e-mail do usuário (login)',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'senha do usuário (login)',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'cpf do usuário',
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 11)
  cpf: string;
}

export default CreditCardRequestDTO;

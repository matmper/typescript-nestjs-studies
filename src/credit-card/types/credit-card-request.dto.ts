import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty, IsEmail, IsNumberString } from 'class-validator'

class CreditCardRequestDTO {
  @ApiProperty({
    description: 'dia de pagamento da fatura'
  })
  @IsNumber()
  preferredDueDay: number;

  @ApiProperty({
    description: 'nome do usuário'
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'e-mail do usuário (login)'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'senha do usuário (login)'
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'cpf do usuário'
  })
  @IsNotEmpty()
  @IsNumberString()
  cpf: string;  
}

export default CreditCardRequestDTO;
import { ApiProperty } from '@nestjs/swagger'

class CreditCardRequestDTO {
  @ApiProperty({
    description: 'nome do usuário'
  })
  name: string;

  @ApiProperty({
    description: 'e-mail do usuário (login)'
  })
  email: string;

  @ApiProperty({
    description: 'senha do usuário (login)'
  })
  password: string;

  @ApiProperty({
    description: 'cpf do usuário'
  })
  cpf: string;  
}

export default CreditCardRequestDTO;
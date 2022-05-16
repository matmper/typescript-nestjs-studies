import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginRequestDTO {

  @ApiProperty({
    description: 'email válido de acesso'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
      description: 'senha de acesso'
  })
  @IsString()
  @IsNotEmpty()
  password: string
  
}

export default LoginRequestDTO
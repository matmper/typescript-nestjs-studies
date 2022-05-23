import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('Usuários')
@Controller('user')
export class UserController {

  @Get()
  getUser(): string {
    return 'Olá usuário!'
  }
}

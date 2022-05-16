import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  @Get()
  getUser(): string {
    return 'Olá usuário!'
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('Usuários')
@Controller('user')
export class UserController {
  @Get()
  getUser(): any {
    return {
      success: true,
      message: 'Olá usuário!',
      data: null,
    };
  }
}

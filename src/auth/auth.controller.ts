import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import LoginRequestDTO from './types/login-request.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './is-public.decorator';

@IsPublic()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Método POST para realizar autenticação
   * @param loginData
   * @returns
   */

  @Post('login')
  async login(@Body() loginRequestDTO: LoginRequestDTO) {
    return await this.authService.login(
      loginRequestDTO.email,
      loginRequestDTO.password,
    );
  }
}

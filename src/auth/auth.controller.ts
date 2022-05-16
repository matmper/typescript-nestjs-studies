import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginRequestDTO from './types/login-request.dto';

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
    const { email, password } = loginRequestDTO

    return await this.authService.login(email, password);
  }
}

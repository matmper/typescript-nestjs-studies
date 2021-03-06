import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Serviço para validar usuário que deverá ser autenticado
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const compare = await bcrypt.compare(password, user.password);

    if (compare !== true) {
      throw new UnauthorizedException();
    }

    const payload = { email, sub: user.id };

    delete user.password;

    return {
      user: user,
      token: this.jwtService.sign(payload),
    };
  }
}

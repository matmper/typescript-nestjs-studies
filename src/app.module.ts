import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CreditCardModule } from './credit-card/credit-card.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import User from './user/user.entity';
import Solicitation from './credit-card/solicitation.entity';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_MYSQL_PORT) || 3306,
      username: process.env.DB_MYSQL_USER || 'root',
      password: process.env.DB_MYSQL_PASS || '',
      database: process.env.DB_MYSQL_NAME,
      entities: [
        User,
        Solicitation
      ],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'abcbanana',
      signOptions: { expiresIn: '3200s' },
    }),
    CreditCardModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule { }

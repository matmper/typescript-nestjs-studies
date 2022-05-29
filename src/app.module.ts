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
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { JWT_SECRET_OR_KEY } from './auth/constants';
import { TransactionModule } from './transaction/transaction.module';
import User from './user/user.entity';
import Solicitation from './credit-card/solicitation.entity';
import CreditCard from './credit-card/credit-card.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASS,
      database: process.env.DB_POSTGRES_NAME,
      entities: [User, Solicitation, CreditCard],
      synchronize: true,
    }),
    JwtModule.register({
      secret: JWT_SECRET_OR_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
    CreditCardModule,
    UserModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    AuthService,
    UserService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}

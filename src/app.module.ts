import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import Transaction from './transaction/transaction.entity';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { StatementService } from './statement/statement.service';
import { StatementModule } from './statement/statement.module';
import { StatementController } from './statement/statement.controller';
import { BalanceModule } from './balance/balance.module';
import { BalanceController } from './balance/balance.controller';
import { BalanceService } from './balance/balance.service';
import { BillService } from './bill/bill.service';
import { ScheduleModule } from '@nestjs/schedule';
import Bill from './bill/bill.entity';
import { BillModule } from './bill/bill.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { CreditCardService } from './credit-card/credit-card.service';

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
      entities: [User, Solicitation, CreditCard, Transaction, Bill],
      synchronize: true,
    }),
    JwtModule.register({
      secret: JWT_SECRET_OR_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    TransactionModule,
    StatementModule,
    BalanceModule,
    BillModule,
    CreditCardModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    TransactionController,
    StatementController,
    BalanceController,
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    TransactionService,
    StatementService,
    BalanceService,
    BillService,
    CreditCardService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}

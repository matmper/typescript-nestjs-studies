import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CreditCardModule } from './credit-card/credit-card.module';
import { UserModule } from './user/user.module';
import User from './user/user.entity';
import Solicitation from './credit-card/solicitation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_MYSQL_PORT)|| 3306,
      username: process.env.DB_MYSQL_USER || 'root',
      password: process.env.DB_MYSQL_PASS || '',
      database: process.env.DB_MYSQL_NAME,
      entities: [
        User,
        Solicitation
      ],
      synchronize: true,
    }),
    CreditCardModule,
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

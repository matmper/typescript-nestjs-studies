import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('Padrão')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return {
      success: true,
      message: this.appService.getHello(),
      data: null,
    };
  }
}

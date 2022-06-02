import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BillService } from './bill.service';

@Injectable()
class BillTask {
  constructor(private billService: BillService) {}

  private readonly logger = new Logger(BillTask.name);

  @Cron(CronExpression.EVERY_12_HOURS)
  handleBillsGeneration() {
    return this.billService.createBill();
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  handleBillsUpdateAmountAndMinimal() {
    this.logger.debug('bills: amount updated');
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  handleBillsUpdateStatus() {
    this.logger.debug('bills: status updated');
  }
}

export default BillTask;

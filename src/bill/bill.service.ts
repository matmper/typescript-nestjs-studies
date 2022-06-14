import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addDays, addMonths, format, startOfMonth } from 'date-fns';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import { UserService } from 'src/user/user.service';
import Bill from './bill.entity';
import User from 'src/user/user.entity';

@Injectable()
export class BillService {
  constructor(
    private userService: UserService,
    private creditCardService: CreditCardService,
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  async createBill() {
    const usersWithoutBill = await this.userService.getUserWithoutBill();

    await usersWithoutBill.forEach(async (user) => {
      const dueDay = await this.creditCardService.getUserPreferredDueDay(user);

      const getDueDate = addDays(
        startOfMonth(addMonths(new Date(), 1)),
        dueDay,
      );

      const dueDate = new Date(format(getDueDate, 'yyyy-MM-dd'));

      const amount = 98.5;
      const minimal = amount ? Math.round(amount / 10) : 0;

      const newBill = new Bill();
      newBill.user = user;
      newBill.dueDate = dueDate;
      newBill.amount = amount;
      newBill.minimal = minimal;
      this.billRepository.save(newBill);
    });

    return { usersWithoutBill };
  }
}

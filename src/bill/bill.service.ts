import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, addMonths, format, startOfMonth } from 'date-fns';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import Bill from './bill.entity';

@Injectable()
export class BillService {
  constructor(
    //@InjectRepository(Bill) private billRepository: Repository<Bill>,
    private userService: UserService,
    private creditCardService: CreditCardService,
  ) {}

  async createBill() {
    const usersWithoutBill = await this.userService.getUserWithoutBill();
    const bills = [];

    await usersWithoutBill.forEach(async (user) => {
      const dueDay = await this.creditCardService.getUserPreferredDueDay(user);
      console.log(dueDay);

      const getDueDate = addDays(
        startOfMonth(addMonths(new Date(), 1)),
        dueDay,
      );

      const dueDate = format(getDueDate, 'yyyy-MM-dd');

      console.log(dueDate);

      // const bill = this.billRepository.save(
      //   this.billRepository.create({
      //     user,
      //     dueDate,
      //   }),
      // );

      bills.push(dueDate);
    });

    return { bills, usersWithoutBill };
  }
}

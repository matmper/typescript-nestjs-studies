import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addDays, addMonths, format, startOfMonth } from 'date-fns';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import { UserService } from 'src/user/user.service';
import Bill from './bill.entity';

@Injectable()
export class BillService {
  constructor(
    private userService: UserService,
    private creditCardService: CreditCardService,
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
  ) {}

  async createBill() {
    const usersWithoutBill = await this.userService.getUserWithoutBill();

    await usersWithoutBill.forEach(async (user) => {
      const dueDay = await this.creditCardService.getUserPreferredDueDay(user);
      console.log(dueDay);

      const getDueDate = addDays(
        startOfMonth(addMonths(new Date(), 1)),
        dueDay,
      );

      const dueDate = format(getDueDate, 'yyyy-MM-dd');

      this.billRepository.save(
        this.billRepository.create({
          user,
          dueDate,
        }),
      );
    });

    return { usersWithoutBill };
  }
}

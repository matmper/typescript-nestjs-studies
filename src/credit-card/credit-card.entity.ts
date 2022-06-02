import Transaction from 'src/transaction/transaction.entity';
import User from 'src/user/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import Brands from './enum/brands.enum';

@Entity()
class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 50 })
  limit: number;

  @Column({ type: 'float', default: 50 })
  disponible: number;

  @Column({ length: 16 })
  number: string;

  @Column({ default: Brands.VISA })
  brand: Brands;

  @Column({ type: 'timestamp' })
  valid_until: Date;

  @Column({ length: 3 })
  cvv: string;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @OneToOne(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.credit_card)
  transactions: Transaction;
}

export default CreditCard;

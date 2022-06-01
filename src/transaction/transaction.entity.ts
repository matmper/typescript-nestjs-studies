import CreditCard from 'src/credit-card/credit-card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import TransactionStatus from './enum/transaction-status.enum';

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  value: number;

  @Column({ default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @JoinColumn({ name: 'credit_card_id' })
  @ManyToOne(() => CreditCard)
  credit_card: CreditCard;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export default Transaction;

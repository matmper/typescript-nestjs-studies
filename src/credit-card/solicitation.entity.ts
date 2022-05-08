import User from 'src/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Solicitation {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn({name: "user_id"})
    @OneToOne(() => User)
    user: User;

    @Column({default: 1})
    status: string;

    @Column()
    preferredDueDay: number;

    @CreateDateColumn({name: "created_at"})
    createdAt!: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt!: Date;

    @DeleteDateColumn({name: "deleted_at"})
    deletedAt?: Date;
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDTO from './types/user.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    /**
     * Realiza a criação de um novo usuário
     * @param user 
     * @returns 
     */
    async createUser(user: UserDTO) {
        const encryptPassword = await this.encryptPassword(user.password);

        const userEntity = this.userRepository.create({
            ...user,
            password: encryptPassword
        });

        return await this.userRepository.save(userEntity);
    }

    /**
     * Retorna um password já com sua cryptografia
     * @param password 
     * @returns string
     */
    private async encryptPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
}

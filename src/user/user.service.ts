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
     * Re4aliza uma verificação se o usuário existe de acordo com email ou cpf
     * @param email 
     * @param cpf 
     * @returns 
     */
    async verifyUserExists(email, cpf) {
        const hasUserByEmail = await this.findUserByEmail(email)

        if (hasUserByEmail.length > 0) {
            return {user: hasUserByEmail, type: 'email'}
        }

        const hasUserByCpf = await this.findUserByCpf(cpf)

        if (hasUserByCpf.length > 0) {
            return {user: hasUserByCpf, type: 'cpf'}
        }

        return false
    }

    /**
     * Captura um usuário pelo seu e-mail
     * @param email 
     * @returns 
     */
    private async findUserByEmail(email: string) {
        return this.userRepository.find({ email })
    }

    /**
     * Captura um usuário pelo seu cpf
     * @param cpf 
     * @returns 
     */
    private async findUserByCpf(cpf: string) {
        return this.userRepository.find({ cpf })
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

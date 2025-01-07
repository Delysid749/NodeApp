import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as cluster from "node:cluster";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async delUserById(id: number): Promise<User | null>{
        const user = this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.userRepository.delete(id);
        return user;
    }

    async createUser(userData: Partial<User>): Promise<User>{
        // 检查邮箱或钱包地址是否已存在
        const existingUser = await this.userRepository.findOne({
            where: [
                {email: userData.email},
                {wallet_address: userData.wallet_address},
            ],
        });
        if(existingUser){
            throw new Error('User with given email or wallet address already exists');
        }
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    }


    async updateUser(id: number, updateData: Partial<User>): Promise<User>{
        //检查用户是否存在
        const user = await this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        Object.assign(user,updateData);
        return await this.userRepository.save(user);
    }
}

import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    //根据id查询用户信息
    @Get(':id')
    async getUser(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.getUserById(id);
        if(!user){
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    //根据id删除用户信息
    @Delete(':id')
    async delUser(@Param('id') id: number): Promise<User | null>{
        const user = await this.usersService.delUserById(id);
        return user;
    }

    //新增用户信息
    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User>{
        return this.usersService.createUser(userData);
    }

    //根据id修改用户信息
    @Patch(':id')
    async updateUser(@Param('id')id : number,@Body() updateData: Partial<User>): Promise<User>{
        return this.usersService.updateUser(id,updateData);
    }
}

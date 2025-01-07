import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // 注册实体
    providers: [UsersService], // 注入服务
    controllers: [UsersController], // 注册控制器
    exports: [UsersService], // 导出服务
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module'; // 其他模块

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        UsersModule, // 加载其他模块
    ],
})
export class AppModule {}

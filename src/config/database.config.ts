import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import {User} from "../modules/users/user.entity";


export const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306, // MySQL 默认端口
    username: 'root', // 替换为你的用户名
    password: '123456', // 替换为你的密码
    database: '2025TECH', // 替换为你的数据库名
    entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'], // 动态加载实体
    synchronize: false,
    logging: true
}
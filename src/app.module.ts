import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { PropertiesModule } from "./modules/properties/properties.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        UsersModule,
        PropertiesModule,
    ],
})
export class AppModule {}

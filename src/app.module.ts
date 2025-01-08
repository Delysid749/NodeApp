import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { PropertiesModule } from "./modules/properties/properties.module";
import { PaymentsModule} from "./modules/payments/payments.module";
import { DisputesModule} from "./modules/disputes/disputes.module";
import { ContractsModule} from "./modules/contracts/contracts.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        UsersModule,
        PropertiesModule,
        PaymentsModule,
        DisputesModule,
        ContractsModule,
    ],
})
export class AppModule {}

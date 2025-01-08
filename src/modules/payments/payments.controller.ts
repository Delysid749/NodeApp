import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.entity';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    async getAllPayments(): Promise<Payment[]> {
        return await this.paymentsService.findAll();
    }

    @Get(':id')
    async getPaymentById(@Param('id') id: number): Promise<Payment> {
        return await this.paymentsService.findById(id);
    }

    @Post()
    async createPayment(@Body() paymentData: Partial<Payment>): Promise<Payment> {
        return await this.paymentsService.createPayment(paymentData);
    }

    @Patch(':id')
    async updatePayment(
        @Param('id') id: number,
        @Body() updateData: Partial<Payment>,
    ): Promise<Payment> {
        return await this.paymentsService.updatePayment(id, updateData);
    }

    @Delete(':id')
    async deletePayment(@Param('id') id: number): Promise<void> {
        await this.paymentsService.deletePayment(id);
    }
}

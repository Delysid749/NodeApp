import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payments.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentsRepository: Repository<Payment>,
    ) {}

    async findAll(): Promise<Payment[]> {
        return await this.paymentsRepository.find({ relations: ['contract_id'] });
    }

    async findById(id: number): Promise<Payment> {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['contract_id'],
        });
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
        const payment = this.paymentsRepository.create(paymentData);
        return await this.paymentsRepository.save(payment);
    }

    async updatePayment(id: number, updateData: Partial<Payment>): Promise<Payment> {
        const payment = await this.findById(id);
        Object.assign(payment, updateData);
        return await this.paymentsRepository.save(payment);
    }

    async deletePayment(id: number): Promise<void> {
        await this.paymentsRepository.delete(id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './disputes.entity';

@Injectable()
export class DisputesService {
    constructor(
        @InjectRepository(Dispute)
        private readonly disputesRepository: Repository<Dispute>,
    ) {}

    async findAll(): Promise<Dispute[]> {
        return await this.disputesRepository.find({ relations: ['contract_id'] });
    }

    async findById(id: number): Promise<Dispute> {
        const dispute = await this.disputesRepository.findOne({
            where: { id },
            relations: ['contract_id'],
        });
        if (!dispute) {
            throw new NotFoundException(`Dispute with ID ${id} not found`);
        }
        return dispute;
    }

    async createDispute(disputeData: Partial<Dispute>): Promise<Dispute> {
        const dispute = this.disputesRepository.create(disputeData);
        return await this.disputesRepository.save(dispute);
    }

    async updateDispute(id: number, updateData: Partial<Dispute>): Promise<Dispute> {
        const dispute = await this.findById(id);
        Object.assign(dispute, updateData);
        return await this.disputesRepository.save(dispute);
    }

    async deleteDispute(id: number): Promise<void> {
        await this.disputesRepository.delete(id);
    }
}

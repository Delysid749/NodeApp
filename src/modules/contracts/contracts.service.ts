import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contracts.entity';

@Injectable()
export class ContractsService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractsRepository: Repository<Contract>,
    ) {}

    async findAll(): Promise<Contract[]> {
        return await this.contractsRepository.find({
            relations: ['property_id', 'landlord_id', 'tenant_id'],
        });
    }

    async findById(id: number): Promise<Contract> {
        const contract = await this.contractsRepository.findOne({
            where: { id },
            relations: ['property_id', 'landlord_id', 'tenant_id'],
        });
        if (!contract) {
            throw new NotFoundException(`Contract with ID ${id} not found`);
        }
        return contract;
    }

    async createContract(contractData: Partial<Contract>): Promise<Contract> {
        const contract = this.contractsRepository.create(contractData);
        return await this.contractsRepository.save(contract);
    }

    async updateContract(id: number, updateData: Partial<Contract>): Promise<Contract> {
        const contract = await this.findById(id);
        Object.assign(contract, updateData);
        return await this.contractsRepository.save(contract);
    }

    async deleteContract(id: number): Promise<void> {
        await this.contractsRepository.delete(id);
    }
}

import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Contract } from './contracts.entity';

@Controller('contracts')
export class ContractsController {
    constructor(private readonly contractsService: ContractsService) {}

    @Get()
    async getAllContracts(): Promise<Contract[]> {
        return await this.contractsService.findAll();
    }

    @Get(':id')
    async getContractById(@Param('id') id: number): Promise<Contract> {
        return await this.contractsService.findById(id);
    }

    @Post()
    async createContract(@Body() contractData: Partial<Contract>): Promise<Contract> {
        return await this.contractsService.createContract(contractData);
    }

    @Patch(':id')
    async updateContract(
        @Param('id') id: number,
        @Body() updateData: Partial<Contract>,
    ): Promise<Contract> {
        return await this.contractsService.updateContract(id, updateData);
    }

    @Delete(':id')
    async deleteContract(@Param('id') id: number): Promise<void> {
        await this.contractsService.deleteContract(id);
    }
}

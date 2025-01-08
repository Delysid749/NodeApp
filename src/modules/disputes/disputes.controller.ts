import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { Dispute } from './disputes.entity';

@Controller('disputes')
export class DisputesController {
    constructor(private readonly disputesService: DisputesService) {}

    @Get()
    async getAllDisputes(): Promise<Dispute[]> {
        return await this.disputesService.findAll();
    }

    @Get(':id')
    async getDisputeById(@Param('id') id: number): Promise<Dispute> {
        return await this.disputesService.findById(id);
    }

    @Post()
    async createDispute(@Body() disputeData: Partial<Dispute>): Promise<Dispute> {
        return await this.disputesService.createDispute(disputeData);
    }

    @Patch(':id')
    async updateDispute(
        @Param('id') id: number,
        @Body() updateData: Partial<Dispute>,
    ): Promise<Dispute> {
        return await this.disputesService.updateDispute(id, updateData);
    }

    @Delete(':id')
    async deleteDispute(@Param('id') id: number): Promise<void> {
        await this.disputesService.deleteDispute(id);
    }
}

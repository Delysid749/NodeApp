import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './properties.entity';

@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService) {}

    @Get()
    async getAllProperties(): Promise<Property[]> {
        return await this.propertiesService.findAll();
    }

    @Get(':id')
    async getPropertyById(@Param('id') id: number): Promise<Property> {
        return await this.propertiesService.findById(id);
    }

    @Post()
    async createProperty(@Body() propertyData: Partial<Property>): Promise<Property> {
        return await this.propertiesService.createProperty(propertyData);
    }

    @Patch(':id')
    async updateProperty(
        @Param('id') id: number,
        @Body() updateData: Partial<Property>,
    ): Promise<Property> {
        return await this.propertiesService.updateProperty(id, updateData);
    }

    @Delete(':id')
    async deleteProperty(@Param('id') id: number): Promise<void> {
        await this.propertiesService.deleteProperty(id);
    }
}

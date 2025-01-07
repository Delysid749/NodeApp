import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './properties.entity';

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(Property)
        private readonly propertiesRepository: Repository<Property>,
    ) {}

    async findAll(): Promise<Property[]> {
        return await this.propertiesRepository.find({ relations: ['landlord_id'] });
    }

    async findById(id: number): Promise<Property> {
        const property = await this.propertiesRepository.findOne({
            where: { id },
            relations: ['landlord_id'],
        });
        if (!property) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }
        return property;
    }

    async createProperty(propertyData: Partial<Property>): Promise<Property> {
        const property = this.propertiesRepository.create(propertyData);
        return await this.propertiesRepository.save(property);
    }

    async updateProperty(id: number, updateData: Partial<Property>): Promise<Property> {
        const property = await this.findById(id);
        Object.assign(property, updateData);
        return await this.propertiesRepository.save(property);
    }

    async deleteProperty(id: number): Promise<void> {
        await this.propertiesRepository.delete(id);
    }
}

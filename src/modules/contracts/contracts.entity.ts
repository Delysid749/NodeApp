import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Property } from '../properties/properties.entity';
import { User } from '../users/users.entity';

@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Property, { nullable: false })
    @JoinColumn({ name: 'property_id' })
    property_id!: Property;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'landlord_id' })
    landlord_id!: User;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'tenant_id' })
    tenant_id!: User;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    rent_amount!: number;

    @Column({ type: 'varchar', length: 64, nullable: false })
    ipfs_hash!: string;

    @Column({
        type: 'enum',
        enum: ['draft', 'signed', 'completed', 'disputed'],
        default: 'draft',
    })
    status!: 'draft' | 'signed' | 'completed' | 'disputed';

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}

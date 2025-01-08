import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Contract } from '../contracts/contracts.entity';

@Entity('disputes')
export class Dispute {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Contract, { nullable: false })
    @JoinColumn({ name: 'contract_id' })
    contract_id!: Contract;

    @Column({ type: 'text', nullable: false })
    reason!: string;

    @Column({ type: 'json', nullable: true })
    evidence?: any; // 可选字段，存储 JSON 数据

    @Column({
        type: 'enum',
        enum: ['pending', 'resolved', 'rejected'],
        default: 'pending',
    })
    status!: 'pending' | 'resolved' | 'rejected';

    @Column({ type: 'text', nullable: true })
    resolution?: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}

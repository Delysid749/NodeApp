import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Contract } from '../contracts/contracts.entity'; // 假设 contracts 模块已存在

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Contract, { nullable: true })
    @JoinColumn({ name: 'contract_id' })
    contract_id!: Contract;

    @Column({ type: 'varchar', length: 42, nullable: false })
    sender_address!: string;

    @Column({ type: 'varchar', length: 42, nullable: false })
    receiver_address!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount!: number;

    @Column({ type: 'varchar', length: 66, nullable: false })
    transaction_hash!: string;

    @Column({
        type: 'enum',
        enum: ['deposit', 'rent', 'refund'],
        nullable: false,
    })
    payment_type!: 'deposit' | 'rent' | 'refund';

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Property } from '../properties/properties.entity';

@Entity('users') // 注意表名必须与数据库中的表名一致
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 42, nullable: true, unique: true })
    wallet_address?: string; // 使用可选标记

    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    email?: string; // 使用可选标记

    @Column({ type: 'varchar', length: 255, nullable: true })
    password_hash: string | null = null; // 添加默认值

    @Column({
        type: 'enum',
        enum: ['tenant', 'landlord', 'arbitrator'],
        default: 'tenant',
    })
    role: string = 'tenant'; // 添加默认值

    @Column({ type: 'json', nullable: true })
    profile: Record<string, any> | null = null; // 添加默认值

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date = new Date(); // 添加默认值

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date = new Date(); // 添加默认值

    // 添加与 Property 的一对多关系
    @OneToMany(() => Property, (property) => property.landlord_id)
    properties!: Property[]; // 每个用户可能拥有多个房产
}

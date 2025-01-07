import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id!: number; // 使用非空断言操作符 `!`

    @ManyToOne(() => User, (user) => user.properties, { nullable: false })
    @JoinColumn({ name: 'landlord_id' })
    landlord_id!: User; // 使用非空断言操作符 `!`

    @Column({ type: 'varchar', length: 255, nullable: false })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string; // 可选字段用 `?`

    @Column({
        type: 'geometry',
        nullable: false,
        transformer: {
            from: (dbValue: string) => dbValue, // 数据库 -> 应用
            to: (entityValue: { type: string; coordinates: [number, number] } | string) => {
                if (typeof entityValue === 'string') {
                    // 如果是 WKT 格式（如 "POINT(x y)"），直接返回
                    return entityValue;
                }
                if (entityValue.type === 'Point' && Array.isArray(entityValue.coordinates)) {
                    const [longitude, latitude] = entityValue.coordinates;
                    return `POINT(${longitude} ${latitude})`;
                }
                throw new Error('Invalid location format');
            },
        },
    })
    location!: { type: string; coordinates: [number, number] };


    @Column({ name: 'rent_price', type: 'decimal', precision: 10, scale: 2, nullable: false })
    rent_price!: number;

    @Column({ type: 'json', nullable: true })
    images?: string[]; // 可选字段用 `?`

    @Column({
        type: 'enum',
        enum: ['available', 'rented', 'inactive'],
        default: 'available',
    })
    status!: 'available' | 'rented' | 'inactive';

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;
}

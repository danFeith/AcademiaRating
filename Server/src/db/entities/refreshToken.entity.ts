import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { users } from "./users.entity";

@Entity()
export class refreshToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

    @Column()
    expiryDate: Date;

    @OneToOne(() => users)
    @JoinColumn()
    user: users
}
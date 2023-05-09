import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class lecturer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

}
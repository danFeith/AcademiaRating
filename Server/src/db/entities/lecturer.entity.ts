import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class lecturer {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ charset: "utf8mb4" })
    name: string

}
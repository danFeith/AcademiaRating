import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { institution } from "./institution.entity"

@Entity()
export class institutionType {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ charset: "utf8mb4" })
    name: string


    @OneToMany(() => institution, (institution) => institution.institutionType)
    institutions: institution[]

}
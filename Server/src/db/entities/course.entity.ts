import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Unique } from "typeorm"
import { institution } from "./institution.entity"
import { lecturer } from "./lecturer.entity"
import { degree } from "./degree.entity"

@Entity()
@Unique(["name", "degree", "institution"])

export class course {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ charset: "utf8mb4", unique: true })
    name: string

    @ManyToMany(() => lecturer, { cascade: true })
    @JoinTable()
    lecturer: lecturer[]

    @ManyToOne(() => institution, (institution) => institution.courses)
    institution: institution

    @ManyToOne(() => degree, (degree) => degree.courses)
    degree: degree

}
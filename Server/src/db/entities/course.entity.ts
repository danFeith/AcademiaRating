import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { institution } from "./institution.entity"
import { lecturer } from "./lecturer.entity"
import { degree } from "./degree.entity"

@Entity()
export class course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => lecturer)
    @JoinTable()
    lecturer: lecturer[]

    @ManyToOne(() => institution, (institution) => institution.courses)
    institution: institution

    @ManyToOne(() => degree, (degree) => degree.courses)
    degree: degree

}
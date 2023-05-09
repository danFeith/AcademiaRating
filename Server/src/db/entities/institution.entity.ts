import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { institutionType } from "./institutionType.entity"
import { degree } from "./degree.entity"
import { course } from "./course.entity"

@Entity()
export class institution {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => institutionType, (institutionType) => institutionType.institutions)
    institutionType: institutionType

    @Column()
    address: string

    @ManyToMany(() => degree)
    @JoinTable()
    degrees: degree[]

    @OneToMany(() => course, (course) => course.institution)
    courses: course[]

}
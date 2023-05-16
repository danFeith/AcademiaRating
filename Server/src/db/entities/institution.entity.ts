import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { institutionType } from "./institutionType.entity"
import { degree } from "./degree.entity"
import { course } from "./course.entity"

@Entity()
export class institution {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ charset: "utf8mb4" })
    name: string

    @ManyToOne(() => institutionType, (institutionType) => institutionType.institutions)
    institutionType: institutionType

    @Column({ charset: "utf8mb4" })
    address: string

    @OneToMany(() => degree, (degree) => degree.institution)
    degrees: degree[]

    @OneToMany(() => course, (course) => course.institution)
    courses: course[]

}
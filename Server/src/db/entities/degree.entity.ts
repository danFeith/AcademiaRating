import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { course } from "./course.entity"
import { institution } from "./institution.entity"

@Entity()
export class degree {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ charset: "utf8mb4", unique: true })
    name: string

    @ManyToOne(() => institution, (institution) => institution.degrees, { cascade: true })
    institution: institution

    @OneToMany(() => course, (course) => course.degree)
    courses: course[]

}
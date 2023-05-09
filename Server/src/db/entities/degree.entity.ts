import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { course } from "./course.entity"

@Entity()
export class degree {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


    @OneToMany(() => course, (course) => course.degree)
    courses: course[]

}
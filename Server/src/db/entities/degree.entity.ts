import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { course } from "./course.entity"

@Entity()
export class degree {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ charset: "utf8mb4" })
    name: string


    @OneToMany(() => course, (course) => course.degree)
    courses: course[]

}
import { Request, Response, NextFunction } from "express"
import courseRepository from "../repositories/course.repository"

export const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courses = await courseRepository.findAll({ id: true, name: true })
    res.status(200).json(courses)
}
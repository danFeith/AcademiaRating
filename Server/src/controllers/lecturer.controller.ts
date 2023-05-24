import { Request, Response, NextFunction } from "express"
import lecturerRepository from "../repositories/lecturer.repository"

export const getAllLecturers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const lecturers = await lecturerRepository.findAll({ id: true, name: true })
    res.status(200).json(lecturers)
}
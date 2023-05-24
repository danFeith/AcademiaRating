import { Request, Response, NextFunction } from "express"
import DegreeRepository from "../repositories/Degree.repository"

export const getAllDegrees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const degrees = await DegreeRepository.findAll({ id: true, name: true })
    res.status(200).json(degrees)
}
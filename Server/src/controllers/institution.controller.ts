import { Request, Response, NextFunction } from "express"
import institutionRepository from "../repositories/institution.repository";

export const getAllInstitutions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const institutions = await institutionRepository.findAll({ id: true, name: true })
    res.status(200).json(institutions)
}
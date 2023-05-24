import { Router } from 'express'
import { getAllLecturers } from '../controllers/lecturer.controller';
const lecturersRoutes = Router();

lecturersRoutes.get(
    "/",
    getAllLecturers

);


export default lecturersRoutes;
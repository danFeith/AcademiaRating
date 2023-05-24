import { Router } from 'express'
import { getAllCourses } from '../controllers/course.controller';

const coursesRoutes = Router();

coursesRoutes.get(
    "/",
    getAllCourses

);


export default coursesRoutes;
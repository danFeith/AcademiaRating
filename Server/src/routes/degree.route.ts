import { Router } from 'express'
import { getAllDegrees } from '../controllers/degree.controller';

const degreesRoutes = Router();

degreesRoutes.get(
    "/",
    getAllDegrees

);

export default degreesRoutes;
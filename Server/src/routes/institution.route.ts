import { Router } from 'express'
import { getAllInstitutions } from '../controllers/institution.controller';

const institutionsRoutes = Router();

institutionsRoutes.get(
    "/",
    getAllInstitutions

);


export default institutionsRoutes;
import { Router } from 'express'
import authJwt from '../middleware/authJwt.js';
import * as testController from "../controllers/test.controller.js";

const testRoutes = Router();

testRoutes.get(
    "/all",
    testController.allAccess
);


testRoutes.get(
    "/user",
    [authJwt.verifyToken],
    testController.userBoard
);


testRoutes.get(
    "/mod",
    [authJwt.verifyToken,
    authJwt.isModerator],
    testController.moderatorBoard
);


testRoutes.get(
    "/admin",
    [authJwt.verifyToken,
    authJwt.isAdmin],
    testController.adminBoard
);

export default testRoutes;
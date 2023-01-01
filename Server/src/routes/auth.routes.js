import { Router } from 'express'
import verifySignUp from "../middleware/verifySignUp.js";
import * as authController from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signup
);

authRoutes.post(
    "/signin",
    authController.signin
);

authRoutes.post(
    "/refreshtoken",
    authController.refreshToken);


export default authRoutes;
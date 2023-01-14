import { Router } from 'express'
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySignUp";
import * as authController from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post(
    "/signup",
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
    authController.signup
);

authRoutes.post(
    "/signin",
    authController.signin
)

authRoutes.post(
    "/refreshtoken",
    authController.refreshToken);

export default authRoutes;
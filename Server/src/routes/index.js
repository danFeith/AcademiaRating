import express from "express";
import authRoutes from './auth.routes.js';
import testRoutes from "./test.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/test", testRoutes)

export default router;
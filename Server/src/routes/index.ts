import { Router } from 'express'
import authRoutes from './auth.routes';
import testRoutes from './test.routes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/test", testRoutes);

export default router;
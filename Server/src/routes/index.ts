import { Router } from 'express'
import authRoutes from './auth.routes';
import testRoutes from './test.routes';
import institutionsRoutes from './institution.route';
import lecturersRoutes from './lecturer.routes';
import coursesRoutes from './course.route';
import degreesRoutes from './degree.route';

const router = Router();

router.use("/auth", authRoutes);
router.use("/test", testRoutes);
router.use("/institution", institutionsRoutes);
router.use("/lecturers", lecturersRoutes)
router.use("/courses", coursesRoutes)
router.use("/degrees", degreesRoutes)

export default router;
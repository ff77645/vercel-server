import { Hono } from "hono";
import authRoutes from './auth/index.js';

const router = new Hono();

router.route('/auth',authRoutes)

export default router
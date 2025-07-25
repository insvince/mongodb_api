import express from 'express';
import { loginController } from '../controllers/login.js';

const router = express.Router();
router.post('/', loginController.getToken);

export default router;

import express from 'express';
import { userController } from '../controllers/user.js';
import { verifyToken, verifyAdmin } from '../models/middlewares.js';

const router = express.Router();

// ✅ Route đăng nhập KHÔNG cần xác thực
router.post('/token', userController.getToken);

// ✅ Các route dưới đây YÊU CẦU token và quyền admin
router.use(verifyToken, verifyAdmin);

/* CREATE USER */
router.post('/', userController.createUser);

/* CREATE MANY USERS */
router.post('/many', userController.createManyUsers);

/* GET ALL USERS */
router.get('/', userController.getAllUsers);

/* GET USER BY ID */
router.get('/:id', userController.getUserById);

/* UPDATE USER */
router.put('/:id', userController.updateUser);

/* DELETE USER */
router.delete('/:id', userController.deleteUser);

export default router;

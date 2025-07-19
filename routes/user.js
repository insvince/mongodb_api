import express from 'express';
import { userController } from '../controllers/user.js';
import { verifyToken, verifyAdmin } from '../models/middlewares.js';

const router = express.Router();

// ✅ Cho phép lấy token mà không cần token
router.post('/token', userController.getToken);

// ⚠️ Tất cả route dưới đây cần có token & là admin
router.use(verifyToken, verifyAdmin);

router.post('/', userController.createUser);
router.post('/many', userController.createManyUsers);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;

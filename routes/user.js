import express from 'express';
import { userController } from '../controllers/user.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);

router.use(verifyToken, verifyAdmin);
router.post('/', userController.createUser);
router.post('/many', userController.createManyUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;

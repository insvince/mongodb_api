import express from 'express';
import { userController } from '../controllers/user.js';

const router = express.Router();

/* CREATE USER */
router.post('/', userController.createUser);

/* CREATE MANY USERS */
router.post('/many', userController.createManyUsers); // Thêm dòng này nếu có controller

/* GET ALL USERS */
router.get('/', userController.getAllUsers);

/* GET USER BY ID */
router.get('/:id', userController.getUserById);

/* UPDATE USER */
router.put('/:id', userController.updateUser);

/* DELETE USER */
router.delete('/:id', userController.deleteUser);

export default router;

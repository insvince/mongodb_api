import express from 'express';
import { userController } from '../controllers/user.js';

const router = express.Router();

/* CREATE USER */
router.post('/', userController.createUser);

/* GET ALL USERS */
router.get('/', userController.getAllUsers);

/* GET USER BY ID */
router.get('/:id', userController.getUserById);

/* UPDATE USER */
router.put('/:id', userController.updateUser);

/* DELETE USER */
router.delete('/:id', userController.deleteUser);

export default router;

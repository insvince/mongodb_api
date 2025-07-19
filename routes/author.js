import express from 'express';
import authController from '../controllers/author.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, authController.getAllAuthors);
router.get('/:id', verifyToken, authController.getAnAuthor);

router.use(verifyToken, verifyAdmin);
router.post('/', authController.addAuthor);
router.post('/many', authController.addManyAuthors); // Thêm dòng này
router.put('/:id', authController.updateAuthor);
router.delete('/:id', authController.deleteAuthor);

export default router;
